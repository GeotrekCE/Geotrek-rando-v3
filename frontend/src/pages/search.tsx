import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getInitialFilters } from 'modules/filters/connector';
import { getDefaultLanguage } from 'modules/header/utills';
import { getSearchResults } from 'modules/results/connector';
import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { getGlobalConfig } from '../modules/utils/api.config';
import Custom404 from './404';

const sanitizeState = (unsafeState: DehydratedState): DehydratedState =>
  JSON.parse(JSON.stringify(unsafeState));

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = 'fr' } = context;
  const queryClient = new QueryClient();
  const { initialFiltersStateWithSelectedOptions } = await getInitialFilters(locale, context.query);
  const parsedInitialFiltersState = parseFilters(initialFiltersStateWithSelectedOptions);
  const initialTextFilter = context.query.text?.toString() ?? null;

  try {
    await queryClient.prefetchQuery(['initialFilterState', locale], () =>
      getInitialFilters(locale, context.query),
    );

    const bboxFilter = undefined;
    const dateFilter = {
      beginDate: context.query.beginDate ?? '',
      endDate: context.query.endDate ?? '',
    };

    await queryClient.prefetchInfiniteQuery(
      [
        'trekResults',
        parsedInitialFiltersState,
        context.locale,
        initialTextFilter,
        bboxFilter,
        dateFilter,
      ],
      () =>
        getSearchResults(
          {
            filtersState: parsedInitialFiltersState,
            textFilterState: initialTextFilter,
            bboxState: null,
            dateFilter: null,
          },
          {
            treks: 1,
            touristicContents: 1,
            outdoorSites: getGlobalConfig().enableOutdoor ? 1 : null,
            touristicEvents: getGlobalConfig().enableTouristicEvents ? 1 : null,
          },
          locale,
        ),
    );
  } catch (error) {
    return {
      props: {
        errorCode: String(error).includes('NOT_FOUND') ? 404 : 500,
      },
    };
  }

  const unsafeState = dehydrate(queryClient);
  const safeState = sanitizeState(unsafeState);

  return {
    props: {
      dehydratedState: safeState,
      language: locale ?? getDefaultLanguage(),
    },
  };
};

interface Props {
  errorCode?: number;
  language: string;
}

const Search: NextPage<Props> = ({ errorCode, language }) => {
  if (errorCode === 404) return <Custom404 />;

  return <SearchUI language={language} />;
};

export default Search;

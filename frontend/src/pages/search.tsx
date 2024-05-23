import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getInitialFilters } from 'modules/filters/connector';
import { getDefaultLanguage } from 'modules/header/utills';
import { getSearchResults } from 'modules/results/connector';
import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { getGlobalConfig } from '../modules/utils/api.config';
import Custom404 from './404';

const sanitizeState = (unsafeState: DehydratedState): DehydratedState =>
  JSON.parse(JSON.stringify(unsafeState));

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = 'fr' } = context;
  const queryClient = new QueryClient();
  const { initialFiltersStateWithSelectedOptions } = await getInitialFilters(locale, context.query);
  const parsedInitialFiltersState = parseFilters(initialFiltersStateWithSelectedOptions);
  const initialTextFilter = context.query.text?.toString() ?? '';
  const page = Number(context.query.page ?? 1);

  try {
    await queryClient.prefetchQuery(['initialFilterState', locale], () =>
      getInitialFilters(locale, context.query),
    );

    const bboxFilter = undefined;
    const dateFilter = {
      beginDate: context.query.beginDate ?? '',
      endDate: context.query.endDate ?? '',
    };

    const commonDictionaries = await getCommonDictionaries(locale);
    await queryClient.prefetchQuery(['commonDictionaries', locale], () => commonDictionaries);

    await queryClient.prefetchQuery(['counter'], () =>
      getSearchResults(
        {
          filtersState: [],
          textFilterState: null,
          bboxState: null,
          dateFilter: { endDate: '', beginDate: '' },
        },
        {
          treks: 1,
          touristicContents: 1,
          outdoorSites: getGlobalConfig().enableOutdoor ? 1 : null,
          touristicEvents: getGlobalConfig().enableTouristicEvents ? 1 : null,
        },
        locale,
        commonDictionaries,
      ),
    );

    await queryClient.prefetchInfiniteQuery(
      [
        'trekResults',
        JSON.stringify(parsedInitialFiltersState),
        context.locale,
        initialTextFilter,
        bboxFilter,
        JSON.stringify(dateFilter),
        page,
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
            treks: page,
            touristicContents: page,
            outdoorSites: getGlobalConfig().enableOutdoor ? page : null,
            touristicEvents: getGlobalConfig().enableTouristicEvents ? page : null,
          },
          locale,
          commonDictionaries,
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

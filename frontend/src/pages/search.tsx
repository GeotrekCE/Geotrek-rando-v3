import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, DehydratedState, QueryCache, QueryClient } from '@tanstack/react-query';
import router from 'next/router';
import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getInitialFilters } from 'modules/filters/connector';
import { getDefaultLanguage } from 'modules/header/utills';
import { getSearchResults } from 'modules/results/connector';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { isRessourceMissing } from 'services/routeUtils';
import { routes } from 'services/routes';
import Custom404 from './404';

const sanitizeState = (unsafeState: DehydratedState): DehydratedState =>
  JSON.parse(JSON.stringify(unsafeState));

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = 'fr' } = context;
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => {
        if (isRessourceMissing(error)) {
          void router.push(routes.HOME);
        }
      },
    }),
  });
  const { initialFiltersStateWithSelectedOptions } = await getInitialFilters(locale, context.query);
  const parsedInitialFiltersState = parseFilters(initialFiltersStateWithSelectedOptions);
  const initialTextFilter = context.query.text?.toString() ?? '';
  const page = Number(context.query.page ?? 1);

  try {
    await queryClient.prefetchQuery({
      queryKey: ['initialFilterState', locale],
      queryFn: () => getInitialFilters(locale, context.query),
    });

    const defaultDate = getGlobalConfig().enableVigilanceAreas
      ? new Date().toISOString().split('T')[0]
      : '';

    const bboxFilter = undefined;
    const dateFilter = {
      beginDate: context.query.beginDate ? context.query.beginDate.toString() : defaultDate,
      endDate: context.query.endDate ? context.query.endDate.toString() : '',
    };
    const contentDateFilter = {
      beginDate: context.query.beginDateContent
        ? context.query.beginDateContent.toString()
        : defaultDate,
      endDate: context.query.endDateContent ? context.query.endDateContent.toString() : '',
    };

    const commonDictionaries = await queryClient.fetchQuery({
      queryKey: ['commonDictionaries', locale],
      queryFn: () => getCommonDictionaries(locale),
    });

    await queryClient.prefetchQuery({
      queryKey: ['counter'],
      queryFn: () =>
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
    });

    await queryClient.prefetchInfiniteQuery({
      queryKey: [
        'trekResults',
        parsedInitialFiltersState,
        context.locale,
        initialTextFilter,
        bboxFilter,
        dateFilter,
        contentDateFilter,
        page,
      ],
      queryFn: () =>
        getSearchResults(
          {
            filtersState: parsedInitialFiltersState,
            textFilterState: initialTextFilter,
            bboxState: null,
            dateFilter,
            contentDateFilter,
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
      initialPageParam: {
        treks: page,
        touristicContents: page,
        outdoorSites: getGlobalConfig().enableOutdoor ? page : null,
        touristicEvents: getGlobalConfig().enableTouristicEvents ? page : null,
      },
    });
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

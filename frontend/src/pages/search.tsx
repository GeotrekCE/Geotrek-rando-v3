import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getInitialFilters } from 'modules/filters/connector';
import { getFiltersState } from 'modules/filters/utils';
import { getDefaultLanguage } from 'modules/header/utills';
import { getSearchResults } from 'modules/results/connector';
import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';
import { getGlobalConfig } from '../modules/utils/api.config';

const sanitizeState = (unsafeState: DehydratedState): DehydratedState =>
  JSON.parse(JSON.stringify(unsafeState));

export const getServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  const initialFiltersState = await getFiltersState(context.locale);
  const parsedInitialFiltersState = parseFilters(initialFiltersState);
  const initialTextFilter = context.query.text !== undefined ? context.query.text : null;

  await queryClient.prefetchQuery(['initialFilterState', context.locale], () =>
    getInitialFilters(context.locale, context.query),
  );

  await queryClient.prefetchInfiniteQuery(
    ['trekResults', parsedInitialFiltersState, context.locale],
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
        context.locale,
      ),
  );

  const unsafeState = dehydrate(queryClient);
  const safeState = sanitizeState(unsafeState);

  return {
    props: {
      dehydratedState: safeState,
      language: context.locale ?? getDefaultLanguage(),
    },
  };
};

export default SearchUI;

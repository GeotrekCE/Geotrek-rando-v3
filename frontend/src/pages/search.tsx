import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getFiltersState, getInitialFiltersStateWithSelectedOptions } from 'modules/filters/utils';
import { getMapResults } from 'modules/mapResults/connector';
import { getSearchResults } from 'modules/results/connector';
import { getTouristicContentCategoryHashMap } from 'modules/touristicContentCategory/connector';
import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';

const sanitizeState = (unsafeState: DehydratedState): DehydratedState => {
  const state = unsafeState;
  console.log('🚀 ~ file: search.tsx ~ line 12 ~ sanitizeState ~ state', JSON.stringify(state));
  //@ts-ignore
  if (state.queries[0].state.data.pageParams[0] === undefined) {
    //@ts-ignore
    state.queries[0].state.data.pageParams[0] = null;
  }
  return { ...state };
};

export const getServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();

  const initialFiltersState = await getFiltersState();
  const parsedInitialFiltersState = parseFilters(initialFiltersState);
  const touristicContentCategoryMapping = await getTouristicContentCategoryHashMap();
  const initialFiltersStateWithSelectedOptions = getInitialFiltersStateWithSelectedOptions({
    initialFiltersState,
    initialOptions: context.query,
    touristicContentCategoryMapping,
  });
  const before = Date.now();
  await queryClient.prefetchInfiniteQuery(['trekResults', parsedInitialFiltersState], () =>
    getSearchResults(parsedInitialFiltersState, { treks: 1, touristicContents: 1 }),
  );
  const after = Date.now();
  console.log('Time for first request', after - before);

  const parsedInitialFilterStateWithSelectedOptions = parseFilters(
    initialFiltersStateWithSelectedOptions,
  );
  const before1 = Date.now();
  await queryClient.prefetchQuery(['mapResults', parsedInitialFilterStateWithSelectedOptions], () =>
    getMapResults(parsedInitialFilterStateWithSelectedOptions),
  );
  const after1 = Date.now();
  console.log('Time for second request', after1 - before1);

  const unsafeState = dehydrate(queryClient);
  const safeState = sanitizeState(unsafeState);

  return {
    props: {
      dehydratedState: safeState,
      initialFiltersState,
      touristicContentCategoryMapping,
      initialFiltersStateWithSelectedOptions,
    },
  };
};

export default SearchUI;

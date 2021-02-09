import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getFiltersState } from 'modules/filters/utils';
import { getSearchResults } from 'modules/results/connector';
import { getTouristicContentCategoryHashMap } from 'modules/touristicContentCategory/connector';
import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';

const sanitizeState = (unsafeState: DehydratedState): DehydratedState => {
  const state = unsafeState;
  //@ts-ignore
  if (state.queries[0].state.data.pageParams[0] === undefined) {
    //@ts-ignore
    state.queries[0].state.data.pageParams[0] = null;
  }
  return { ...state };
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const initialFiltersState = await getFiltersState();
  const parsedInitialFiltersState = parseFilters(initialFiltersState);

  const touristicContentCategoryMapping = await getTouristicContentCategoryHashMap();

  await queryClient.prefetchInfiniteQuery(['trekResults', parsedInitialFiltersState], () =>
    getSearchResults(parsedInitialFiltersState, { treks: 1, touristicContents: 1 }),
  );

  const unsafeState = dehydrate(queryClient);
  const safeState = sanitizeState(unsafeState);

  return {
    props: {
      dehydratedState: safeState,
      initialFiltersState,
      touristicContentCategoryMapping,
    },
  };
};

export default SearchUI;

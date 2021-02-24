import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getFiltersState, getInitialFiltersStateWithSelectedOptions } from 'modules/filters/utils';
import { getDefaultLanguage } from 'modules/header/utills';
import { getSearchResults } from 'modules/results/connector';
import { getTouristicContentCategoryHashMap } from 'modules/touristicContentCategory/connector';
import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';

const sanitizeState = (unsafeState: DehydratedState): DehydratedState => {
  const state = unsafeState;
  //@ts-ignore
  if (state.queries.length > 0 && state.queries[0].state.data.pageParams[0] === undefined) {
    //@ts-ignore
    state.queries[0].state.data.pageParams[0] = null;
  }
  return { ...state };
};

export const getServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  const initialFiltersState = await getFiltersState(context.locale);
  const parsedInitialFiltersState = parseFilters(initialFiltersState);
  const touristicContentCategoryMapping = await getTouristicContentCategoryHashMap(context.locale);
  const initialFiltersStateWithSelectedOptions = getInitialFiltersStateWithSelectedOptions({
    initialFiltersState,
    initialOptions: context.query,
    touristicContentCategoryMapping,
  });

  await queryClient.prefetchInfiniteQuery(['trekResults', parsedInitialFiltersState], () =>
    getSearchResults(parsedInitialFiltersState, { treks: 1, touristicContents: 1 }, context.locale),
  );

  const unsafeState = dehydrate(queryClient);
  const safeState = sanitizeState(unsafeState);

  return {
    props: {
      dehydratedState: safeState,
      initialFiltersState,
      touristicContentCategoryMapping,
      initialFiltersStateWithSelectedOptions,
      language: context.locale ?? getDefaultLanguage(),
    },
  };
};

export default SearchUI;

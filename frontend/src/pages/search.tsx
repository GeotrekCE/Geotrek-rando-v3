import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getFiltersState } from 'modules/filters/utils';
import { getTrekResults } from 'modules/results/connector';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const initialFiltersState = await getFiltersState();
  const parsedInitialFiltersState = parseFilters(initialFiltersState);

  await queryClient.prefetchInfiniteQuery(['trekResults', parsedInitialFiltersState], () =>
    getTrekResults(parsedInitialFiltersState, 1),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      initialFiltersState: JSON.parse(JSON.stringify(initialFiltersState)),
    },
  };
};

export default SearchUI;

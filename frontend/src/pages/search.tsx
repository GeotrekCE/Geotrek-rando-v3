import { SearchUI } from 'components/pages/search';
import { getFiltersState } from 'modules/filters/utils';
import { QueryClient } from 'react-query';

export const getServerSideProps = async () => {
  // const queryClient = new QueryClient();

  const initialFiltersState = await getFiltersState();

  // const activitySuggestionIds: string[] = homePageConfig.suggestions.reduce<string[]>(
  //   (suggestionIds, currentSuggestion) => [...suggestionIds, ...currentSuggestion.ids],
  //   [],
  // );

  // await queryClient.prefetchQuery(`activitySuggestions-${activitySuggestionIds.join('-')}`, () =>
  //   getActivitySuggestions(activitySuggestionIds),
  // );

  // await queryClient.prefetchQuery('homeActivities', getActivities);

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      initialFiltersState,
    },
  };
};

export default SearchUI;

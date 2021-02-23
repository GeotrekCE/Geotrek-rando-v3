import { Home } from 'components/pages/home';
import { getActivityBarContent } from 'modules/activities/connector';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { getHomePageConfig } from 'modules/home/utils';

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const homePageConfig = getHomePageConfig();

  const activitySuggestionIds: string[] = homePageConfig.suggestions.reduce<string[]>(
    (suggestionIds, currentSuggestion) => [...suggestionIds, ...currentSuggestion.ids],
    [],
  );

  await queryClient.prefetchQuery(`activitySuggestions-${activitySuggestionIds.join('-')}`, () =>
    getActivitySuggestions(activitySuggestionIds),
  );

  await queryClient.prefetchQuery('homeActivities', () => getActivityBarContent());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;

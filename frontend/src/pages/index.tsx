import { Home } from 'components/pages/home';
import { getActivityBarContent } from 'modules/activities/connector';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { getHomePageConfig } from 'modules/home/utils';

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const getServerSideProps = async (context: { locale: string }) => {
  const queryClient = new QueryClient();

  const homePageConfig = getHomePageConfig();

  const activitySuggestionIds: string[] = homePageConfig.suggestions.reduce<string[]>(
    (suggestionIds, currentSuggestion) => [...suggestionIds, ...currentSuggestion.ids],
    [],
  );

  await queryClient.prefetchQuery(
    ['activitySuggestions', activitySuggestionIds.join('-'), context.locale],
    () => getActivitySuggestions(activitySuggestionIds, context.locale),
  );

  await queryClient.prefetchQuery(`homeActivities-${context.locale}`, () =>
    getActivityBarContent(context.locale),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;

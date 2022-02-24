import { Home } from 'components/pages/home';
import { flatten } from 'lodash';
import { getActivityBarContent } from 'modules/activities/connector';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { getHomePageConfig } from 'modules/home/utils';

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const getServerSideProps = async (context: { locale: string }) => {
  const queryClient = new QueryClient();

  const homePageConfig = getHomePageConfig();

  const activitySuggestionIds = flatten(homePageConfig.suggestions.map(s => s.ids));

  await queryClient.prefetchQuery(
    ['activitySuggestions', activitySuggestionIds.join('-'), context.locale],
    () => getActivitySuggestions(homePageConfig.suggestions, context.locale),
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

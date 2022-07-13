import { Home } from 'components/pages/home';
import { flatten } from 'lodash';
import { getActivityBarContent } from 'modules/activities/connector';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { adaptSuggestions, getHomePageConfig } from 'modules/home/utils';

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const getServerSideProps = async (context: { locale: string }) => {
  const queryClient = new QueryClient();

  const homePageConfig = getHomePageConfig();
  const suggestions = adaptSuggestions(homePageConfig.suggestions, context.locale);

  if (suggestions !== null) {
    const activitySuggestionIds = flatten(suggestions.map(s => s.ids));

    await queryClient.prefetchQuery(
      ['activitySuggestions', activitySuggestionIds.join('-'), context.locale],
      () => getActivitySuggestions(suggestions, context.locale),
    );

    await queryClient.prefetchQuery(`homeActivities-${context.locale}`, () =>
      getActivityBarContent(context.locale),
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;

import { Home } from 'components/pages/home';
import { getActivityBarContent } from 'modules/activities/connector';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { adaptSuggestions, getHomePageConfig } from 'modules/home/utils';
import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = 'fr' } = context;
  const queryClient = new QueryClient();

  const homePageConfig = getHomePageConfig();
  const suggestions = adaptSuggestions(homePageConfig.suggestions, locale);

  if (suggestions !== null) {
    const activitySuggestionIds = suggestions.flatMap(s => s.ids);

    await queryClient.prefetchQuery(
      ['activitySuggestions', activitySuggestionIds.join('-'), locale],
      () => getActivitySuggestions(suggestions, locale),
    );

    await queryClient.prefetchQuery(['homeActivities, locale'], () =>
      getActivityBarContent(locale),
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;

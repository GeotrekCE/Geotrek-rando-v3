import { Home } from 'components/pages/home';
import { getActivityBarContent } from 'modules/activities/connector';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { adaptSuggestions, getHomePageConfig } from 'modules/home/utils';
import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getCommonDictionaries } from 'modules/dictionaries/connector';

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = 'fr' } = context;
  const queryClient = new QueryClient();

  const homePageConfig = getHomePageConfig();
  const suggestions = adaptSuggestions(homePageConfig.suggestions, locale);

  if (suggestions !== null) {
    const commonDictionaries = await queryClient.fetchQuery({
      queryKey: ['commonDictionaries', locale],
      queryFn: () => getCommonDictionaries(locale),
    });

    const activitySuggestionIds = suggestions.flatMap(suggestion =>
      'ids' in suggestion ? suggestion.ids : [suggestion.type],
    );

    await queryClient.prefetchQuery({
      queryKey: ['activitySuggestions', activitySuggestionIds, locale],
      queryFn: () => getActivitySuggestions(suggestions, locale, commonDictionaries),
    });
  }

  if (homePageConfig.activityBar.shouldDisplay === true) {
    await queryClient.prefetchQuery({
      queryKey: ['homeActivities', locale],
      queryFn: () => getActivityBarContent(locale, homePageConfig.activityBar.links),
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;

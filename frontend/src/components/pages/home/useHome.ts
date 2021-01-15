import { getHomePageConfig } from 'modules/home/utils';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { useQuery } from 'react-query';

export const useHome = () => {
  const { data: activitySuggestions } = useQuery<ActivitySuggestion[], Error>(
    'activitySuggestions',
    getActivitySuggestions,
  );
  const homePageConfig = getHomePageConfig();

  return { config: homePageConfig, activitySuggestions };
};

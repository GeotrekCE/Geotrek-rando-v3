import { flatten } from 'lodash';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { HomePageConfig } from 'modules/home/interface';
import { adaptSuggestions, getHomePageConfig } from 'modules/home/utils';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
interface UseHome {
  config: HomePageConfig;
  suggestions: ActivitySuggestion[];
}

export const useHome = (): UseHome => {
  const homePageConfig = getHomePageConfig();
  const language = useRouter().locale ?? getDefaultLanguage();
  const suggestions = adaptSuggestions(homePageConfig.suggestions, language);

  if (suggestions === null) {
    return { config: homePageConfig, suggestions: [] };
  }

  const activitySuggestionIds = flatten(suggestions.map(s => s.ids));

  const { data = [] } = useQuery<ActivitySuggestion[], Error>(
    ['activitySuggestions', activitySuggestionIds.join('-'), language],
    () => getActivitySuggestions(suggestions, language),
  );

  return { config: homePageConfig, suggestions: data };
};

import { flatten } from 'lodash';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { getHomePageConfig } from 'modules/home/utils';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export const useHome = () => {
  const homePageConfig = getHomePageConfig();

  const activitySuggestionIds = flatten(homePageConfig.suggestions.map(s => s.ids));

  const language = useRouter().locale ?? getDefaultLanguage();
  const { data: suggestions } = useQuery<ActivitySuggestion[], Error>(
    ['activitySuggestions', activitySuggestionIds.join('-'), language],
    () => getActivitySuggestions(homePageConfig.suggestions, language),
  );

  return { config: homePageConfig, suggestions: suggestions as ActivitySuggestion[] };
};

import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { HomePageConfig } from 'modules/home/interface';
import { adaptSuggestions, getHomePageConfig } from 'modules/home/utils';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useQueryCommonDictionaries } from 'modules/dictionaries/api';
interface UseHome {
  config: HomePageConfig;
  suggestions: ActivitySuggestion[];
}

export const useHome = (): UseHome => {
  const homePageConfig = getHomePageConfig();
  const language = useRouter().locale ?? getDefaultLanguage();
  const suggestions = adaptSuggestions(homePageConfig.suggestions, language) ?? [];

  const activitySuggestionIds = suggestions.flatMap(suggestion =>
    'ids' in suggestion ? suggestion.ids : [suggestion.type],
  );

  const commonDictionaries = useQueryCommonDictionaries(language);

  const { data = [] } = useQuery<ActivitySuggestion[] | [], Error>({
    queryKey: ['activitySuggestions', `Suggestion-${activitySuggestionIds.join('-')}`, language],
    queryFn: () => getActivitySuggestions(suggestions, language, commonDictionaries),
    enabled: suggestions.length > 0 && commonDictionaries !== undefined,
  });

  return { config: homePageConfig, suggestions: data };
};

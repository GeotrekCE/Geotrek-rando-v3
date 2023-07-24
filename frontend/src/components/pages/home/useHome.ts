import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { HomePageConfig } from 'modules/home/interface';
import { adaptSuggestions, getHomePageConfig } from 'modules/home/utils';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { ONE_DAY } from 'services/constants/staleTime';
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

  const { data: commonDictionaries } = useQuery<CommonDictionaries, Error>(
    ['commonDictionaries', language],
    () => getCommonDictionaries(language),
    {
      staleTime: ONE_DAY / 2,
    },
  );

  const { data = [] } = useQuery<ActivitySuggestion[] | [], Error>(
    ['activitySuggestions', `Suggestion-${activitySuggestionIds.join('-')}`, language],
    () => getActivitySuggestions(suggestions, language, commonDictionaries),
    { enabled: suggestions.length > 0 && commonDictionaries !== undefined },
  );

  return { config: homePageConfig, suggestions: data };
};

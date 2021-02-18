import { getHomePageConfig } from 'modules/home/utils';
import { ActivitySuggestionDictionnary } from 'modules/activitySuggestions/interface';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { useQuery } from 'react-query';
import { DisplayableSuggestionCategory } from 'modules/home/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { useRouter } from 'next/router';

export const useHome = () => {
  const homePageConfig = getHomePageConfig();

  const activitySuggestionIds: string[] = homePageConfig.suggestions.reduce<string[]>(
    (suggestionIds, currentSuggestion) => [...suggestionIds, ...currentSuggestion.ids],
    [],
  );
  const language = useRouter().locale ?? getDefaultLanguage();
  const { data: activitySuggestionDictionnary } = useQuery<ActivitySuggestionDictionnary, Error>(
    `activitySuggestions-${activitySuggestionIds.join('-')}`,
    () => getActivitySuggestions(activitySuggestionIds, language),
  );
  const activitySuggestionCategories: DisplayableSuggestionCategory[] =
    activitySuggestionDictionnary !== undefined
      ? homePageConfig.suggestions.map(suggestion => ({
          titleTranslationId: suggestion.titleTranslationId,
          iconUrl: suggestion.iconUrl,
          suggestions: suggestion.ids.map(id => activitySuggestionDictionnary[id]),
        }))
      : [];

  return { config: homePageConfig, activitySuggestionCategories };
};

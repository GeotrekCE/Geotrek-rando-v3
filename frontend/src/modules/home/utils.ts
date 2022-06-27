import getNextConfig from 'next/config';
import { DeprecatedSuggestionList, HomePageConfig, Suggestion, SuggestionList } from './interface';

export const getHomePageConfig = (): HomePageConfig => {
  const {
    publicRuntimeConfig: { home },
  } = getNextConfig();

  return home;
};

export const adaptSuggestions = (
  suggestions: DeprecatedSuggestionList | SuggestionList,
  language: string,
): Suggestion[] | null => {
  //  Backward compatibility with versions prior to 3.9.1
  if (Array.isArray(suggestions)) {
    return suggestions;
  }

  if (language in suggestions) {
    return suggestions[language];
  }

  return suggestions.default ?? null;
};

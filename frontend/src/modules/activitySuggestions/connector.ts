import { adaptActivitySuggestion } from './adapter';
import { fetchActivitySuggestion } from './api';
import { ActivitySuggestionDictionnary } from './interface';

export const getActivitySuggestions = async (
  ids: string[],
  language: string,
): Promise<ActivitySuggestionDictionnary> => {
  const rawSuggestions = await Promise.all(
    ids.map(async id => {
      try {
        const suggestion = await fetchActivitySuggestion(id, {
          language,
        });
        return suggestion;
      } catch (error) {
        return null;
      }
    }),
  );
  const reduced = rawSuggestions.reduce((activitySuggestionDictionnary, currentRawSuggestion) => {
    if (currentRawSuggestion !== null) {
      return {
        ...activitySuggestionDictionnary,
        [currentRawSuggestion.id]: adaptActivitySuggestion(currentRawSuggestion),
      };
    } else {
      return activitySuggestionDictionnary;
    }
  }, {});
  return reduced;
};

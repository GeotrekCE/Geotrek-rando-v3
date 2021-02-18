import { adaptActivitySuggestion } from './adapter';
import { fetchActivitySuggestion } from './api';
import { ActivitySuggestionDictionnary } from './interface';

export const getActivitySuggestions = async (
  ids: string[],
  language: string,
): Promise<ActivitySuggestionDictionnary> => {
  const rawSuggestions = await Promise.all(
    ids.map(id =>
      fetchActivitySuggestion(id, {
        language,
      }),
    ),
  );

  return rawSuggestions.reduce(
    (activitySuggestionDictionnary, currentRawSuggestion) => ({
      ...activitySuggestionDictionnary,
      [currentRawSuggestion.id]: adaptActivitySuggestion(currentRawSuggestion),
    }),
    {},
  );
};

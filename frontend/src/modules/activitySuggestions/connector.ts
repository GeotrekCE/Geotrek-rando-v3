import { adaptActivitySuggestion } from './adapter';
import { fetchActivitySuggestion } from './api';
import { ActivitySuggestionDictionnary } from './interface';

export const getActivitySuggestions = async (
  ids: string[],
): Promise<ActivitySuggestionDictionnary> => {
  const rawSuggestions = await Promise.all(
    ids.map(id =>
      fetchActivitySuggestion(id, {
        language: 'fr',
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

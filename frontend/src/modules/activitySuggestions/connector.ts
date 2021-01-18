import { adaptResults } from './adapter';
import { fetchActivitySuggestions } from './api';
import { ActivitySuggestion } from './interface';

const SUGGESTION_NUMBER = 5;

export const getActivitySuggestions = async (): Promise<ActivitySuggestion[]> => {
  const rawResults = await fetchActivitySuggestions({
    language: 'fr',
    page_size: SUGGESTION_NUMBER,
  });
  return adaptResults(rawResults.results);
};

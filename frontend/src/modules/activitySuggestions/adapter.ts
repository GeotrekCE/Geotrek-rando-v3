import { ActivitySuggestion, RawActivitySuggestion } from './interface';

export const adaptResults = (rawActivities: RawActivitySuggestion[]): ActivitySuggestion[] =>
  rawActivities.map(rawActivity => ({
    title: rawActivity.name,
    imgUrl: rawActivity.thumbnail.url,
  }));

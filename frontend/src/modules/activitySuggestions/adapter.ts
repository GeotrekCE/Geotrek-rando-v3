import { getThumbnail } from 'modules/utils/adapter';
import { ActivitySuggestion, RawActivitySuggestion } from './interface';

export const adaptResults = (rawActivities: RawActivitySuggestion[]): ActivitySuggestion[] =>
  rawActivities.map(rawActivity => ({
    title: rawActivity.name,
    imgUrl: getThumbnail(rawActivity.attachments),
  }));

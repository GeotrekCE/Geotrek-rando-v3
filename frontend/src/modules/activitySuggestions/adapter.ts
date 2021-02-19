import { getThumbnail } from 'modules/utils/adapter';
import { ActivitySuggestion, RawActivitySuggestion } from './interface';

export const adaptActivitySuggestion = (
  rawActivitySuggestion: RawActivitySuggestion,
): ActivitySuggestion => ({
  id: rawActivitySuggestion.id,
  title: rawActivitySuggestion.name,
  imgUrl: getThumbnail(rawActivitySuggestion.attachments),
});

import { ActivitySuggestion, RawActivitySuggestion, RawAttachment } from './interface';

const getThumbnail = (rawAttachments: RawAttachment[]): string | null => {
  let thumbnail: string | null = null;
  rawAttachments.forEach(rawAttachment => {
    if (rawAttachment.type === 'image') {
      thumbnail = rawAttachment.url;
    }
  });
  return thumbnail;
};

export const adaptResults = (rawActivities: RawActivitySuggestion[]): ActivitySuggestion[] =>
  rawActivities.map(rawActivity => ({
    title: rawActivity.name,
    imgUrl: getThumbnail(rawActivity.attachments),
  }));

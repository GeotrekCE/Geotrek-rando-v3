import { RawAttachment } from 'modules/activitySuggestions/interface';

export const getThumbnail = (rawAttachments: RawAttachment[]): string | null => {
  let thumbnail: string | null = null;
  rawAttachments.forEach(rawAttachment => {
    if (rawAttachment.type === 'image') {
      thumbnail = rawAttachment.url;
    }
  });
  return thumbnail;
};

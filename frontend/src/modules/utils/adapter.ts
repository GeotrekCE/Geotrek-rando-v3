import { RawAttachment } from 'modules/activitySuggestions/interface';
import { APIResponseForList } from 'services/api/interface';

export const getThumbnail = (rawAttachments: RawAttachment[]): string | null => {
  let thumbnail: string | null = null;
  rawAttachments.forEach(rawAttachment => {
    if (rawAttachment.type === 'image') {
      thumbnail = rawAttachment.url;
    }
  });
  return thumbnail;
};

export function concatResults<T>(rawResults: APIResponseForList<T>[]): T[] {
  return rawResults.reduce<T[]>(
    (concatenatedResults, currentResult) => [...concatenatedResults, ...currentResult.results],
    [],
  );
}

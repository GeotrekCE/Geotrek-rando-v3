import { RawAttachment } from 'modules/activitySuggestions/interface';
import { APIResponseForList } from 'services/api/interface';

const fallbackImgUri = 'https://upload.wikimedia.org/wikipedia/fr/d/df/Logo_ecrins.png';

export const getThumbnail = (rawAttachments: RawAttachment[]): string | null => {
  let thumbnail: string | null = null;
  rawAttachments.forEach(rawAttachment => {
    if (rawAttachment.type === 'image') {
      thumbnail = rawAttachment.url;
    }
  });
  return thumbnail;
};

export const getThumbnails = (rawAttachments: RawAttachment[]): string[] => {
  const thumbnails = rawAttachments
    .filter(
      rawAttachment =>
        rawAttachment.type === 'image' &&
        rawAttachment.url !== null &&
        rawAttachment.url.length > 0,
    )
    .map(rawAttachment => rawAttachment.url);
  if (thumbnails.length > 0) {
    return thumbnails;
  }
  return [fallbackImgUri];
};

export function concatResults<T>(rawResults: APIResponseForList<T>[]): T[] {
  return rawResults.reduce<T[]>(
    (concatenatedResults, currentResult) => [...concatenatedResults, ...currentResult.results],
    [],
  );
}

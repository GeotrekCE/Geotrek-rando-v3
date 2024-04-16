import { ImageFromAttachment, RawAttachment } from 'modules/interface';
import { APIResponseForList } from 'services/api/interface';
import { getGlobalConfig } from './api.config';

const fallbackAttachment: ImageFromAttachment = {
  url: getGlobalConfig().fallbackImageUri,
  author: '',
  legend: '',
};

export const getThumbnail = (rawAttachments: RawAttachment[]): string | null => {
  const firstImageAttachment = rawAttachments.find(({ type }) => type === 'image');
  if (firstImageAttachment === undefined) return null;
  return firstImageAttachment.thumbnail;
};

export const getLargeImagesOrThumbnailsFromAttachments = (
  rawAttachments: RawAttachment[],
  isThumbnail: boolean,
) => {
  const attachments = rawAttachments
    .filter(
      rawAttachment =>
        rawAttachment.type === 'image' &&
        rawAttachment.url !== null &&
        rawAttachment.url.length > 0,
    )
    .map(rawAttachment => ({
      url: isThumbnail ? rawAttachment.thumbnail : rawAttachment.url,
      legend: rawAttachment.legend,
      author: rawAttachment.author,
    }));
  return attachments.length > 0 ? attachments : [fallbackAttachment];
};

export function concatResults<T>(rawResults: APIResponseForList<T>[]): T[] {
  return rawResults.reduce<T[]>(
    (concatenatedResults, currentResult) => [...concatenatedResults, ...currentResult.results],
    [],
  );
}

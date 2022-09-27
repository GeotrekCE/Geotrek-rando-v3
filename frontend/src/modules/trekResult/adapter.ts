import { getThumbnail } from 'modules/utils/adapter';
import { getGlobalConfig } from 'modules/utils/api.config';
import { PopupResult, RawTrekPopupResult } from './interface';

export const fallbackImgUri = getGlobalConfig().fallbackImageUri;

export const adaptTrekPopupResults = (rawDetails: RawTrekPopupResult): PopupResult => {
  return {
    title: rawDetails.name,
    place: rawDetails.departure,
    imgUrl: getThumbnail(rawDetails.attachments) ?? fallbackImgUri,
  };
};

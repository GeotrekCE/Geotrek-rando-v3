import { RawTrekPopupResult, TrekPopupResult } from './interface';

export const adaptTrekPopupResults = (rawDetails: RawTrekPopupResult): TrekPopupResult => {
  return {
    title: rawDetails.name,
    place: rawDetails.departure,
    imgUrl: rawDetails.thumbnail.url,
  };
};

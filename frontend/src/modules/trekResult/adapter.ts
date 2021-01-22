import { RawTrekPopupResult, TrekPopupResult } from './interface';

const fallbackImgUri = 'https://upload.wikimedia.org/wikipedia/fr/d/df/Logo_ecrins.png';

export const adaptTrekPopupResults = (rawDetails: RawTrekPopupResult): TrekPopupResult => {
  return {
    title: rawDetails.name,
    place: rawDetails.departure,
    imgUrl: rawDetails.thumbnail.url || fallbackImgUri,
  };
};

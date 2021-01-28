import { getThumbnail } from 'modules/utils/adapter';
import {
  RawTrekGeometryResult,
  RawTrekPopupResult,
  TrekGeometryResult,
  TrekPopupResult,
} from './interface';

const fallbackImgUri = 'https://upload.wikimedia.org/wikipedia/fr/d/df/Logo_ecrins.png';

export const adaptTrekPopupResults = (rawDetails: RawTrekPopupResult): TrekPopupResult => {
  return {
    title: rawDetails.name,
    place: rawDetails.departure,
    imgUrl: getThumbnail(rawDetails.attachments) ?? fallbackImgUri,
  };
};

export const adaptTrekGeometryResults = (
  rawGeometry: RawTrekGeometryResult,
): TrekGeometryResult => {
  return {
    geometry: rawGeometry.geometry.coordinates.map(rawCoordinates => ({
      x: rawCoordinates[0],
      y: rawCoordinates[1],
      z: rawCoordinates[2],
    })),
  };
};

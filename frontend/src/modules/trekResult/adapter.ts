import { getThumbnail } from 'modules/utils/adapter';
import { getGlobalConfig } from 'modules/utils/api.config';
import {
  PopupResult,
  RawTrekGeometryResult,
  RawTrekPopupResult,
  TrekGeometryResult,
} from './interface';

export const fallbackImgUri = getGlobalConfig().fallbackImageUri;

export const adaptTrekPopupResults = (rawDetails: RawTrekPopupResult): PopupResult => {
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

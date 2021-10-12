import { RawCoordinate3D } from 'modules/interface';
import { getThumbnail } from 'modules/utils/adapter';
import { getGlobalConfig } from 'modules/utils/api.config';
import {
  adaptGeometry2D,
  adaptGeometry3D,
  flattenMultiLineStringCoordinates,
} from 'modules/utils/geometry';
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
  if (rawGeometry.geometry.type === 'Point') {
    return { geometry: [adaptGeometry2D(rawGeometry.geometry.coordinates)] };
  }

  const rawCoordinates: RawCoordinate3D[] =
    rawGeometry.geometry.type === 'MultiLineString'
      ? flattenMultiLineStringCoordinates(rawGeometry.geometry.coordinates)
      : rawGeometry.geometry.coordinates;

  return {
    geometry: rawCoordinates.map(adaptGeometry3D),
  };
};

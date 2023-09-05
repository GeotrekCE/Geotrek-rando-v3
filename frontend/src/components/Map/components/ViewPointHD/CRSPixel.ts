import L from 'leaflet';
import { ViewPoint } from 'modules/viewPoint/interface';

export const CRSPixel = ({ metadata }: ViewPoint) => {
  if (metadata === null) {
    return L.CRS.Simple;
  }
  const { sizeX, sizeY, tileWidth, levels } = metadata;
  const step = 2 ** (levels - 1);
  return L.Util.extend(L.CRS.Simple, {
    transformation: new L.Transformation(
      Math.min(step * tileWidth, sizeX) / step / sizeX,
      0,
      Math.min(step * tileWidth, sizeY) / step / sizeY,
      0,
    ),
  });
};

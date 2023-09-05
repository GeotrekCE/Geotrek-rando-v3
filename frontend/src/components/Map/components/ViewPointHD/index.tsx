import L from 'leaflet';
import { ViewPoint } from 'modules/viewPoint/interface';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
// @ts-ignore
L.RasterCoords = require('leaflet-rastercoords');

const ViewPointHD: React.FC<ViewPoint> = ({ pictureTilesUrl, metadata }) => {
  if (!metadata || !pictureTilesUrl) {
    return null;
  }

  const { sizeX, sizeY, tileWidth } = metadata;
  const map = useMap();

  // @ts-ignore
  const [raster] = useState(new L.RasterCoords(map, [sizeX, sizeY], tileWidth));

  useEffect(() => {
    if (map === undefined) {
      return;
    }

    const { offsetHeight, offsetWidth } = map.getContainer();
    const southWest = raster.unproject([0, sizeY - (sizeY - offsetHeight) / 2]);
    const northEast = raster.unproject([sizeX - (sizeX - offsetWidth) / 2, 0]);
    const bounds = new L.LatLngBounds(southWest, northEast);

    map.fitBounds(bounds);
    map.setMaxZoom(raster.zoomLevel());

    const layer = new L.TileLayer(pictureTilesUrl, {
      noWrap: false,
      bounds: raster.getMaxBounds(),
      maxNativeZoom: raster.zoomLevel(),
    });
    map.addLayer(layer);
    return () => {
      if (layer !== null) {
        map.removeLayer(layer);
      }
    };
  }, [map, raster]);

  return null;
};
export default ViewPointHD;

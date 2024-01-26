import L from 'leaflet';
import { ViewPoint } from 'modules/viewPoint/interface';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-rastercoords';

const ViewPointHD: React.FC<ViewPoint> = ({ pictureTilesUrl, metadata }) => {
  const map = useMap();
  useEffect(() => {
    if (!metadata || !pictureTilesUrl) {
      return;
    }
    const { sizeX, sizeY, tileWidth } = metadata;

    const raster = new L.RasterCoords(map, [sizeX, sizeY], tileWidth);
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
  }, [map, pictureTilesUrl, metadata]);

  return null;
};
export default ViewPointHD;

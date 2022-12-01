import { TileLayer } from 'components/Map/interface';
import { getMapConfig } from 'components/Map/config';
import TileLayerExtended from '../TileLayerExtended';

interface TileLayerGroupProps {
  layers: TileLayer[];
}

const TileLayerGroup: React.FC<TileLayerGroupProps> = ({ layers }) => {
  if (layers.length === 0) {
    return null;
  }
  const { maximumZoomLevel, zoomAvailableOffline = [0, maximumZoomLevel] } = getMapConfig();

  const groupRangeZoom = layers.reduce(
    (list, { options: { minZoom = 0, maxZoom = maximumZoomLevel } = {} }) => {
      if (navigator.onLine === false) {
        return [Math.min(...zoomAvailableOffline), Math.max(...zoomAvailableOffline)];
      }
      return [Math.min(minZoom, list[0]), Math.max(maxZoom, list[1])];
    },
    [Infinity, -Infinity],
  );

  return (
    <>
      {layers.map(layer => (
        <TileLayerExtended key={layer.url} rangeZoom={groupRangeZoom} {...layer} />
      ))}
    </>
  );
};

export default TileLayerGroup;

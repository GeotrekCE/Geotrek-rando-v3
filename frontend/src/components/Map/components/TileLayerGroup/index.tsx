import { TileLayer } from 'components/Map/interface';
import TileLayerExtended from '../TileLayerExtended';

interface TileLayerGroupProps {
  layers: TileLayer[];
}

const TileLayerGroup: React.FC<TileLayerGroupProps> = ({ layers }) => {
  if (layers.length === 0) {
    return null;
  }

  const groupRangeZoom = layers.reduce(
    (list, { options: { minZoom = 0, maxZoom = 20 } = {} }) => {
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

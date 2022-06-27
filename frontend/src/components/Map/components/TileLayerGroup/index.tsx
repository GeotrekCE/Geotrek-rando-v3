import { TileLayer } from 'components/Map/interface';
import TileLayerExtended from '../TileLayerExtended';

interface TileLayerGroupProps {
  layers: TileLayer[];
}

const TileLayerGroup: React.FC<TileLayerGroupProps> = ({ layers }) => {
  if (layers.length === 0) {
    return null;
  }

  return (
    <>
      {layers.map(layer => (
        <TileLayerExtended key={layer.url} {...layer} />
      ))}
    </>
  );
};

export default TileLayerGroup;

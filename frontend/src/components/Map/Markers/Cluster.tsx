import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

// Not typed by the lib, this is guessed from the documentation
// https://www.npmjs.com/package/react-leaflet-markercluster#api
interface ClusterType {
  getChildCount: () => number;
}

const Cluster: React.FC<{ number: number }> = ({ number }) => {
  return <div className="h-10 w-10">{number}</div>;
};

export const ClusterMarker = (cluster: ClusterType) =>
  new DivIcon({
    iconSize: [40, 40],
    // point of the icon which will correspond to marker's location
    iconAnchor: [20, 20], // horizontal middle of the icon and bottom of it,
    html: renderToStaticMarkup(<Cluster number={cluster.getChildCount()} />),
  });

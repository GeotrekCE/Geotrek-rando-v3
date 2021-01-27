import { DivIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

const ActivityMarker: React.FC = () => {
  return <img src="/icons/map-marker.svg" />;
};

export const TrekMarker = new DivIcon({
  iconSize: [36, 44],
  // point of the icon which will correspond to marker's location
  iconAnchor: [18, 44], // horizontal middle of the icon and bottom of it
  html: renderToStaticMarkup(<ActivityMarker />),
  className: 'bg-none border-none',
});

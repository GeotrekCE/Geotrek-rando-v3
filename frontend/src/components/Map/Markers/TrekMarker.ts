import { Icon } from 'leaflet';

export const TrekMarker = new Icon({
  iconUrl: '/icons/map-marker.svg',
  iconSize: [36, 44],
  // point of the icon which will correspond to marker's location
  iconAnchor: [18, 44], // horizontal middle of the icon and bottom of it
});

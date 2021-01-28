import { Icon } from 'leaflet';

const markerHeight = 44;
const markerWidth = 36;

export const DepartureMarker = new Icon({
  iconUrl: '/icons/departure-map-marker.svg',
  iconSize: [markerWidth, markerHeight],
  // point of the icon which will correspond to marker's location
  iconAnchor: [markerWidth / 2, markerHeight], // horizontal middle of the icon and bottom of it
});

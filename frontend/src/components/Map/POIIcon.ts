import { Icon } from 'leaflet';

const POIIcon = new Icon({
  iconUrl: '/images/leaf-green.png',
  shadowUrl: '/images/leaf-shadow.png',
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

export { POIIcon };

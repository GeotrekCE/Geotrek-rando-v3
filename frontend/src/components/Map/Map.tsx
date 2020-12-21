import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { POIList } from 'domain/POI/POI';

import 'leaflet/dist/leaflet.css';

export type PropsType = {
  points?: POIList | null;
};

const Map = (props: PropsType) => {
  return (
    <MapContainer
      center={[44.8985958, 6.2061167]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 500, width: 500 }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.points &&
        props.points.length > 0 &&
        props.points.map(point => {
          return (
            <Marker
              key={point.id}
              position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default Map;

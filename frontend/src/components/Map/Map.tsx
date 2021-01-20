import { MapContainer, TileLayer } from 'react-leaflet';
import { POIList } from 'domain/POI/POI';
import { TreksList } from 'domain/Trek/Trek';

import 'leaflet/dist/leaflet.css';

export type PropsType = {
  points?: POIList | null;
  segments?: TreksList | null;
};

const Map = (props: PropsType) => {
  return (
    <MapContainer
      center={[44.748717, 6.1189669]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {props.points &&
        props.points.length > 0 &&
        props.points.map(point => {
          return (
            <Marker
              key={point.id}
              position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
              icon={POIIcon}
            >
              <Popup>
                A pretty CSS3 popup. <br /> For point {point.geometry.coordinates[1]},{' '}
                {point.geometry.coordinates[0]}
              </Popup>
            </Marker>
          );
        })}
      {props.segments &&
        props.segments.length > 0 &&
        props.segments.map(segment => {
          return (
            <Polyline
              key={segment.id}
              positions={segment.geometry.coordinates.map(coordinate => [
                coordinate[1],
                coordinate[0],
              ])}
              color={'red'}
            />
          );
        })} */}
    </MapContainer>
  );
};

export default Map;

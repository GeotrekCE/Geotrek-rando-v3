import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { MapResults } from 'modules/mapResults/interface';
import { TreksList } from 'domain/Trek/Trek';
import { POIIcon } from './POIIcon';
import { Popup } from './Popup';

import 'leaflet/dist/leaflet.css';
import { MapButton } from './components/MapButton';

export type PropsType = {
  points?: MapResults;
  segments?: TreksList | null;
  hideMap?: () => void;
};

const Map: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };
  return (
    <>
      <MapContainer
        center={[44.748717, 6.1189669]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.points !== undefined &&
          props.points.map(
            point =>
              point.location !== null && (
                <Marker
                  key={point.id}
                  position={[point.location.y, point.location.x]}
                  icon={POIIcon}
                >
                  <Popup id={point.id} />
                </Marker>
              ),
          )}
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
    </>
  );
};

export default Map;

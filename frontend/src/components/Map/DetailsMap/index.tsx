import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';

import { DetailsSections } from 'components/pages/details/useDetails';
import { ArrivalMarker } from '../Markers/ArrivalMarker';
import { DepartureMarker } from '../Markers/DepartureMarker';
import { ParkingMarker } from '../Markers/ParkingMarker';

import { MapButton } from '../components/MapButton';
import { FilterButton } from '../components/FilterButton';
import { DecoratedPolyline } from '../components/DecoratedPolyline';

import { POIMarkers } from './POIMarkers';

export type PropsType = {
  poiPoints?: { location: { x: number; y: number }; pictogramUri: string; name: string }[];
  segments?: { x: number; y: number }[];
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  arrivalLocation?: { x: number; y: number };
  departureLocation?: { x: number; y: number };
  parkingLocation?: { x: number; y: number };
  shouldUsePopups?: boolean;
  elementOnScreen: DetailsSections | null;
};

const DetailsMap: React.FC<PropsType> = props => {
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
        zoomControl={props.type === 'DESKTOP'}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.elementOnScreen === 'preview' && (
          <>
            {props.arrivalLocation !== undefined && (
              <Marker
                position={[props.arrivalLocation.y, props.arrivalLocation.x]}
                icon={ArrivalMarker}
              />
            )}
            {props.departureLocation !== undefined && (
              <Marker
                position={[props.departureLocation.y, props.departureLocation.x]}
                icon={DepartureMarker}
              />
            )}
            {props.parkingLocation !== undefined && (
              <Marker
                position={[props.parkingLocation.y, props.parkingLocation.x]}
                icon={ParkingMarker}
              />
            )}
            {props.segments && <DecoratedPolyline positions={props.segments} />}
          </>
        )}

        {props.elementOnScreen === 'poi' && <POIMarkers poiPoints={props.poiPoints} />}
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
    </>
  );
};

export default DetailsMap;

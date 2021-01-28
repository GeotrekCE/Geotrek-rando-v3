import React from 'react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { MapResults } from 'modules/mapResults/interface';

import { colorPalette } from 'stylesheet';
import { TrekMarker } from './Markers/TrekMarker';
import { ArrivalMarker } from './Markers/ArrivalMarker';
import { DepartureMarker } from './Markers/DepartureMarker';
import { ParkingMarker } from './Markers/ParkingMarker';

import { Popup } from './components/Popup';
import { MapButton } from './components/MapButton';
import { FilterButton } from './components/FilterButton';
import { TrekCourse } from './components/TrekCourse';
import { ClusterContainer } from './components/ClusterContainer';
import { useSelectedMarker } from './hooks/useSelectedMarker';

export type PropsType = {
  points?: MapResults;
  segments?: { x: number; y: number }[];
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  arrivalLocation?: { x: number; y: number };
  departureLocation?: { x: number; y: number };
  parkingLocation?: { x: number; y: number };
  shouldUseClusters?: boolean;
  shouldUsePopups?: boolean;
};

const Map: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const {
    isSelectedMarker,
    setSelectedMarkerId,
    resetSelectedMarker,
    selectedMarkerId,
  } = useSelectedMarker();

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
        <ClusterContainer enabled={props.shouldUseClusters ?? false}>
          {props.points !== undefined &&
            props.points.map(
              point =>
                point.location !== null && (
                  <Marker
                    key={point.id}
                    position={[point.location.y, point.location.x]}
                    icon={
                      isSelectedMarker(point.id)
                        ? TrekMarker(point.practice.pictogram)
                        : TrekMarker(point.practice.pictogram)
                    }
                  >
                    {(props.shouldUsePopups ?? false) && (
                      <Popup
                        id={point.id}
                        handleOpen={() => setSelectedMarkerId(point.id)}
                        handleClose={resetSelectedMarker}
                      />
                    )}
                  </Marker>
                ),
            )}
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
        </ClusterContainer>
        {props.segments && (
          <Polyline
            positions={props.segments.map(coordinates => [coordinates.y, coordinates.x])}
            color={colorPalette.primary1}
          />
        )}
        <TrekCourse id={selectedMarkerId} />
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
    </>
  );
};

export default Map;

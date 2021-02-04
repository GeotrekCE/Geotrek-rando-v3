import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { MapResults } from 'modules/mapResults/interface';

import { TrekMarker } from '../Markers/TrekMarker';
import { ArrivalMarker } from '../Markers/ArrivalMarker';
import { DepartureMarker } from '../Markers/DepartureMarker';
import { ParkingMarker } from '../Markers/ParkingMarker';

import { Popup } from '../components/Popup';
import { MapButton } from '../components/MapButton';
import { FilterButton } from '../components/FilterButton';
import { TrekCourse } from '../components/TrekCourse';
import { ClusterContainer } from '../components/ClusterContainer';
import { useSelectedMarker } from '../hooks/useSelectedMarker';
import { DecoratedPolyline } from '../components/DecoratedPolyline';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';

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

const SearchMap: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const mapConfig = getMapConfig();

  const {
    isSelectedMarker,
    setSelectedMarkerId,
    resetSelectedMarker,
    selectedMarkerId,
  } = useSelectedMarker();

  return (
    <>
      <MapContainer
        center={mapConfig.searchMapCenter as [number, number]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        zoomControl={props.type === 'DESKTOP'}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
        {props.segments && <DecoratedPolyline positions={props.segments} />}
        <TrekCourse id={selectedMarkerId} />
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
      <Credits className="absolute right-0 bottom-0 z-mapButton">{mapConfig.mapCredits}</Credits>
    </>
  );
};

export default SearchMap;

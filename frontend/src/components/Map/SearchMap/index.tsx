import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { MapResults } from 'modules/mapResults/interface';
import { useTileLayer } from 'hooks/useTileLayer';
import { MapLayerTypeToggleButton } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';

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
import { HoverableMarker } from '../components/HoverableMarker';

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

  const { setSelectedMarkerId, resetSelectedMarker, selectedMarkerId } = useSelectedMarker();

  const {
    tileLayerType,
    isTileLayerClassic,
    isTileLayerSatellite,
    onTileToggleButtonClick,
    isSatelliteLayerAvailable,
  } = useTileLayer();

  return (
    <>
      <MapContainer
        center={mapConfig.searchMapCenter as [number, number]}
        zoom={mapConfig.searchMapZoom}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
        zoomControl={props.type === 'DESKTOP'}
        attributionControl={false}
        id="search_map"
      >
        {isTileLayerClassic && <TileLayer url={mapConfig.mapClassicLayerUrl} />}
        {isTileLayerSatellite && mapConfig.mapSatelliteLayerUrl && (
          <TileLayer url={mapConfig.mapSatelliteLayerUrl} />
        )}
        <ClusterContainer enabled={props.shouldUseClusters ?? false}>
          {props.points !== undefined &&
            props.points.map(
              point =>
                point.location !== null && (
                  <HoverableMarker
                    id={`SEARCH-${point.type}-${point.id}`}
                    type="TREK"
                    position={[point.location.y, point.location.x]}
                    pictogramUri={point.practice?.pictogram}
                  >
                    {(props.shouldUsePopups ?? false) && (
                      <Popup
                        id={point.id}
                        handleOpen={() => setSelectedMarkerId(point.id)}
                        handleClose={resetSelectedMarker}
                        type={point.type}
                      />
                    )}
                  </HoverableMarker>
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
        {isSatelliteLayerAvailable && (
          <div className="absolute bottom-6 left-6 z-mapButton">
            <MapLayerTypeToggleButton
              selectedTileLayerType={tileLayerType}
              onToggleButtonClick={onTileToggleButtonClick}
            />
          </div>
        )}
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
      <Credits className="absolute right-0 bottom-0 z-mapButton">{mapConfig.mapCredits}</Credits>
    </>
  );
};

export default SearchMap;

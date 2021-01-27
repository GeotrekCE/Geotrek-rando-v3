import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { MapResults } from 'modules/mapResults/interface';
import { TreksList } from 'domain/Trek/Trek';
import { TrekMarker } from './Markers/TrekMarker';
import { ActiveTrekMarker } from './Markers/ActiveTrekMarker';
import { Popup } from './components/Popup';

import 'leaflet/dist/leaflet.css';
import { MapButton } from './components/MapButton';
import { FilterButton } from './components/FilterButton';
import { useSelectedMarker } from './hooks/useSelectedMarker';
import { TrekCourse } from './components/TrekCourse';
import { ClusterMarker } from './Markers/Cluster';

export type PropsType = {
  points?: MapResults;
  segments?: TreksList | null;
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  openFilterMenu?: () => void;
  hasFilters?: boolean;
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

  /**
   * Above this zoom level the cluster radius will be highZoomClusterRadius, below it will be lowZoomClusterRadius
   * We discriminate to be able to better see individual markers in high zoom if possible
   */
  const clusterRadiusThreshold = 13;
  const lowZoomClusterRadius = 40;
  const highZoomClusterRadius = 20;
  /** Above this zoom level there won't be clustering, the user better sees its trek course on the map when clicking on the marker */
  const clusteringMaxZoom = 15;

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
        {/* https://github.com/Leaflet/Leaflet.markercluster#all-options */}
        <MarkerClusterGroup
          iconCreateFunction={ClusterMarker}
          maxClusterRadius={(zoom: number) =>
            zoom <= clusterRadiusThreshold ? lowZoomClusterRadius : highZoomClusterRadius
          }
          disableClusteringAtZoom={clusteringMaxZoom}
          spiderfyOnMaxZoom={false}
        >
          {props.points !== undefined &&
            props.points.map(
              point =>
                point.location !== null && (
                  <Marker
                    key={point.id}
                    position={[point.location.y, point.location.x]}
                    icon={
                      isSelectedMarker(point.id)
                        ? ActiveTrekMarker
                        : TrekMarker(point.practice.pictogram)
                    }
                  >
                    <Popup
                      id={point.id}
                      handleOpen={() => setSelectedMarkerId(point.id)}
                      handleClose={resetSelectedMarker}
                    />
                  </Marker>
                ),
            )}
        </MarkerClusterGroup>
        <TrekCourse id={selectedMarkerId} />
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <FilterButton openFilterMenu={props.openFilterMenu} hasFilters={props.hasFilters} />
    </>
  );
};

export default Map;

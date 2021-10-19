import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { Bbox } from 'modules/details/interface';
import { LineStringGeometry, PointGeometry, PolygonGeometry } from 'modules/interface';
import { MapLayerTypeToggleButton } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { useTileLayer } from 'hooks/useTileLayer';
import { MapButton } from '../components/MapButton';

import { TouristicContent } from '../DetailsMap/TouristicContent';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';
import { TouristicContentGeometry } from '../DetailsMap/DetailsMap';

interface TouristicContentGeometryNullable {
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry | null;
  pictogramUri: string;
  name: string;
  id: string;
}

export type PropsType = {
  touristicContentGeometry: TouristicContentGeometryNullable;
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  bbox: Bbox;
};

export const TouristicContentMap: React.FC<PropsType> = props => {
  const center: LatLngBoundsExpression = [
    [props.bbox.corner1.y, props.bbox.corner1.x],
    [props.bbox.corner2.y, props.bbox.corner2.x],
  ];

  const { isSatelliteLayerAvailable, setMapInstance, updateTileLayer } = useTileLayer(
    Number(props.touristicContentGeometry.id),
    center,
  );

  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const mapConfig = getMapConfig();
  return (
    <>
      <MapContainer
        scrollWheelZoom
        maxZoom={
          navigator.onLine
            ? mapConfig.maximumZoomLevel
            : Math.max(...(mapConfig?.zoomAvailableOffline ?? []))
        }
        minZoom={
          navigator.onLine ? undefined : Math.min(...(mapConfig?.zoomAvailableOffline ?? []))
        }
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMapInstance}
        zoomControl={props.type === 'DESKTOP'}
        bounds={center}
        attributionControl={false}
      >
        <TileLayer url={mapConfig.mapClassicLayerUrl} />
        {props.touristicContentGeometry !== null && (
          <TouristicContent
            contents={[props.touristicContentGeometry as TouristicContentGeometry]}
          />
        )}

        {isSatelliteLayerAvailable && (
          <div className="absolute bottom-6 left-6 z-mapButton">
            <MapLayerTypeToggleButton onToggleButtonClick={newType => updateTileLayer(newType)} />
          </div>
        )}
      </MapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <Credits className="absolute right-0 bottom-0 z-mapButton">{mapConfig.mapCredits}</Credits>
    </>
  );
};

export default TouristicContentMap;

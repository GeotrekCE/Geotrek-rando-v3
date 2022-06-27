import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { MapContainer, ScaleControl, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { Bbox } from 'modules/details/interface';
import {
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
} from 'modules/interface';
import { useTileLayer } from 'hooks/useTileLayer';
import { BackButton } from '../components/BackButton';

import { TouristicContent } from '../DetailsMap/TouristicContent';
import { getMapConfig } from '../config';
import { TouristicContentGeometry } from '../DetailsMap/DetailsMap';
import { ResetView } from '../components/ResetView';
import TileLayerManager from '../components/TileLayerManager';

interface TouristicContentGeometryNullable {
  geometry:
    | PolygonGeometry
    | MultiPolygonGeometry
    | LineStringGeometry
    | MultiLineStringGeometry
    | PointGeometry
    | MultiPointGeometry
    | null;
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

  const { setMapInstance } = useTileLayer(Number(props.touristicContentGeometry.id), center);

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
        <BackButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
        <ResetView />
        <TileLayerManager />
        <ScaleControl />
        {props.touristicContentGeometry !== null && (
          <TouristicContent
            contents={[props.touristicContentGeometry as TouristicContentGeometry]}
          />
        )}
      </MapContainer>
    </>
  );
};

export default TouristicContentMap;

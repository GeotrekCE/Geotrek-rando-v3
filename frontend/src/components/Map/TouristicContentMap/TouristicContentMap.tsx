import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { MapContainer, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { Bbox } from 'modules/details/interface';
import {
  GeometryCollection,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
} from 'modules/interface';
import { useTileLayer } from 'hooks/useTileLayer';
import { BackButton } from '../components/BackButton';

import { GeometryList } from '../DetailsMap/GeometryList';
import { getMapConfig } from '../config';
import { GeometryListProps } from '../DetailsMap/DetailsMap';
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
    | GeometryCollection
    | null;
  pictogramUri: string;
  name: string;
  id: string;
}

export type PropsType = {
  touristicContentGeometry: TouristicContentGeometryNullable;
  hideMap?: () => void;
  hasZoomControl: boolean;
  bbox: Bbox;
};

export const TouristicContentMap: React.FC<PropsType> = props => {
  const bounds: LatLngBoundsExpression = [
    [props.bbox.corner1.y, props.bbox.corner1.x],
    [props.bbox.corner2.y, props.bbox.corner2.x],
  ];

  const { setMapInstance } = useTileLayer(Number(props.touristicContentGeometry.id), bounds);

  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const mapConfig = getMapConfig();
  return (
    <>
      <MapContainer
        className="size-full"
        scrollWheelZoom
        maxZoom={
          navigator.onLine
            ? mapConfig.maximumZoomLevel
            : Math.max(...(mapConfig?.zoomAvailableOffline ?? []))
        }
        minZoom={
          navigator.onLine ? undefined : Math.min(...(mapConfig?.zoomAvailableOffline ?? []))
        }
        whenCreated={setMapInstance}
        zoomControl={props.hasZoomControl}
        bounds={bounds}
        attributionControl={false}
      >
        <BackButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
        <ResetView />
        <TileLayerManager />
        <ScaleControl />
        {props.touristicContentGeometry !== null && (
          <GeometryList contents={[props.touristicContentGeometry as GeometryListProps]} />
        )}
      </MapContainer>
    </>
  );
};

export default TouristicContentMap;

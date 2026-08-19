import { LatLngBoundsExpression } from 'leaflet';
import React, { useState, useContext } from 'react';
import { MapContainer, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
import { VigilanceArea } from 'modules/vigilanceArea/interface';
import { adaptVigilanceAreaGeometry } from 'modules/vigilanceArea/adapter';
import { getGlobalConfig } from 'modules/utils/api.config';
import { useTileLayer } from 'hooks/useTileLayer';
import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { BackButton } from 'components/Map/components/BackButton';

import { GeometryList } from 'components/Map/DetailsMap/GeometryList';
import { VigilanceAreas } from 'components/Map/DetailsMap/VigilanceAreas';
import { getMapConfig } from 'components/Map/config';
import { GeometryListProps } from 'components/Map/DetailsMap/DetailsMap';
import { ResetView } from 'components/Map/components/ResetView';
import TileLayerManager from 'components/Map/components/TileLayerManager';
import LocateControl from 'components/Map/components/LocateControl';
import FullscreenControl from 'components/Map/components/FullScreenControl';
import { Visibility } from 'components/Map/DetailsMap/useDetailsMap';
import { ControlSection } from 'components/Map/components/ControlSection/ControlSection';
import { VisibleSectionContext } from 'components/pages/details/VisibleSectionContext';

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
  vigilanceAreas?: VigilanceArea[];
};

export const TouristicContentMap: React.FC<PropsType> = props => {
  const [vigilanceVisibility, setVigilanceVisibility] = useState<Visibility>('HIDDEN');
  const toggleVigilanceVisibility = () =>
    setVigilanceVisibility(prev => (prev === 'DISPLAYED' ? 'HIDDEN' : 'DISPLAYED'));

  const { visibleSection } = useContext(VisibleSectionContext);

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
    <MapContainer
      className="size-full"
      scrollWheelZoom
      maxZoom={
        navigator.onLine
          ? mapConfig.maximumZoomLevel
          : Math.max(...(mapConfig?.zoomAvailableOffline ?? []))
      }
      minZoom={navigator.onLine ? undefined : Math.min(...(mapConfig?.zoomAvailableOffline ?? []))}
      ref={setMapInstance}
      zoomControl={props.hasZoomControl}
      bounds={bounds}
      attributionControl={false}
    >
      <BackButton icon={<ArrowLeft size={18} />} onClick={hideMap} />
      {props.hasZoomControl === true && <FullscreenControl />}
      <ResetView />
      <TileLayerManager />
      <ControlSection
        vigilanceVisibility={
          props.vigilanceAreas && props.vigilanceAreas.length > 0 ? vigilanceVisibility : undefined
        }
        toggleVigilanceVisibility={toggleVigilanceVisibility}
      />
      <LocateControl />
      <ScaleControl />
      {props.touristicContentGeometry !== null && (
        <GeometryList contents={[props.touristicContentGeometry as GeometryListProps]} />
      )}
      {getGlobalConfig().enableVigilanceAreas &&
        props.vigilanceAreas &&
        props.vigilanceAreas.length > 0 &&
        (visibleSection === 'vigilance' || vigilanceVisibility === 'DISPLAYED') && (
          <VigilanceAreas
            contents={props.vigilanceAreas
              .filter(area => area.geometry !== null)
              .map(adaptVigilanceAreaGeometry)}
          />
        )}
    </MapContainer>
  );
};

export default TouristicContentMap;

import { TouristicContent } from 'components/Map/DetailsMap/TouristicContent';
import { LatLngBoundsExpression } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

import { ArrowLeft } from 'components/Icons/ArrowLeft';

import {
  Coordinate2D,
  LineStringGeometry,
  PointGeometry,
  PolygonGeometry,
} from 'modules/interface';
import { useTileLayer } from 'hooks/useTileLayer';
import { MapLayerTypeToggleButton } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { TrekChildGeometry, TrekFamily } from 'modules/details/interface';
import { SensitiveAreaGeometry } from 'modules/sensitiveArea/interface';
import { MapButton } from '../components/MapButton';

import { TrekMarkersAndCourse } from './TrekMarkersAndCourse';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';
import { AltimetricProfile } from '../components/AltimetricProfile';
import { ControlSection } from '../components/ControlSection';
import { useDetailsMap } from './useDetailsMap';
import { MapChildren, PointWithIcon } from './MapChildren';
import DetailsMapDrawer from '../components/DetailsMapDrawer';

export interface TouristicContentGeometry {
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry;
  pictogramUri: string;
  name: string;
  id: string;
}

export type PropsType = {
  poiPoints?: PointWithIcon[];
  touristicContentPoints?: TouristicContentGeometry[];
  trekGeometry?: Coordinate2D[];
  outdoorGeometry?: TouristicContentGeometry;
  eventGeometry?: TouristicContentGeometry;
  trekGeoJSON?: string;
  pointsReference?: Coordinate2D[] | null;
  hideMap?: () => void;
  type: 'DESKTOP' | 'MOBILE';
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  arrivalLocation?: Coordinate2D;
  departureLocation?: Coordinate2D;
  parkingLocation?: Coordinate2D;
  shouldUsePopups?: boolean;
  bbox: { corner1: Coordinate2D; corner2: Coordinate2D };
  trekFamily?: TrekFamily | null;
  trekChildrenGeometry?: TrekChildGeometry[];
  sensitiveAreas?: SensitiveAreaGeometry[];
  trekId: number;
  advisedParking?: string;
  title?: string;
};

export const DetailsMap: React.FC<PropsType> = props => {
  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
    }
  };

  const {
    trekChildrenMobileVisibility,
    toggleTrekChildrenVisibility,
    poiMobileVisibility,
    togglePoiVisibility,
    referencePointsMobileVisibility,
    toggleReferencePointsVisibility,
    touristicContentMobileVisibility,
    toggleTouristicContentVisibility,
  } = useDetailsMap();
  const mapConfig = getMapConfig();

  const center: LatLngBoundsExpression = [
    [props.bbox.corner1.y, props.bbox.corner1.x],
    [props.bbox.corner2.y, props.bbox.corner2.x],
  ];

  const { isSatelliteLayerAvailable, setMapInstance, updateTileLayer } = useTileLayer(
    props.trekId,
    center,
  );

  return (
    <>
      <StyledMapContainer
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
        maxZoom={
          navigator.onLine
            ? mapConfig.maximumZoomLevel
            : Math.max(...(mapConfig?.zoomAvailableOffline ?? []))
        }
        minZoom={
          navigator.onLine ? undefined : Math.min(...(mapConfig?.zoomAvailableOffline ?? []))
        }
        zoomControl={props.type === 'DESKTOP'}
        attributionControl={false}
        whenCreated={setMapInstance}
        bounds={center}
        hasDrawer={!!props.title}
      >
        <TileLayer url={mapConfig.mapClassicLayerUrl} />
        {props.trekGeometry && (
          <TrekMarkersAndCourse
            arrivalLocation={props.arrivalLocation}
            departureLocation={props.departureLocation}
            parkingLocation={props.parkingLocation}
            trekGeometry={props.trekGeometry}
            advisedParking={props.advisedParking}
          />
        )}
        {props.outdoorGeometry && <TouristicContent contents={[props.outdoorGeometry]} />}
        {props.eventGeometry && (
          <TouristicContent contents={[props.eventGeometry]} type={'TOURISTIC_EVENT'} />
        )}
        <MapChildren
          parentId={props.trekId}
          poiPoints={props.poiPoints}
          touristicContentPoints={props.touristicContentPoints}
          pointsReference={props.pointsReference}
          trekChildrenGeometry={props.trekChildrenGeometry}
          sensitiveAreasGeometry={props.sensitiveAreas}
          trekChildrenMobileVisibility={trekChildrenMobileVisibility}
          poiMobileVisibility={poiMobileVisibility}
          referencePointsMobileVisibility={referencePointsMobileVisibility}
          touristicContentMobileVisibility={touristicContentMobileVisibility}
        />
        {props.trekGeoJSON && (
          <AltimetricProfile id="altimetric-profile" trekGeoJSON={props.trekGeoJSON} />
        )}
        {isSatelliteLayerAvailable && (
          <div className={`absolute ${props.title ? 'bottom-18' : 'bottom-6'} left-6 z-mapButton`}>
            <MapLayerTypeToggleButton onToggleButtonClick={newType => updateTileLayer(newType)} />
          </div>
        )}
        {props.title && (
          <div className="desktop:hidden">
            <DetailsMapDrawer
              title={props.title}
              trekGeoJSON={props.trekGeoJSON}
              trekFamily={props.trekFamily}
              trekId={props.trekId}
            />
          </div>
        )}
      </StyledMapContainer>
      <MapButton className="desktop:hidden" icon={<ArrowLeft size={24} />} onClick={hideMap} />
      <ControlSection
        className="desktop:hidden"
        trekChildrenVisibility={
          props.trekChildrenGeometry && props.trekChildrenGeometry.length > 0
            ? trekChildrenMobileVisibility
            : null
        }
        poiVisibility={props.poiPoints && props.poiPoints.length > 0 ? poiMobileVisibility : null}
        referencePointsVisibility={
          props.pointsReference && props.pointsReference.length > 0
            ? referencePointsMobileVisibility
            : null
        }
        touristicContentVisibility={
          props.touristicContentPoints && props.touristicContentPoints.length > 0
            ? touristicContentMobileVisibility
            : null
        }
        toggleTrekChildrenVisibility={toggleTrekChildrenVisibility}
        togglePoiVisibility={togglePoiVisibility}
        toggleReferencePointsVisibility={toggleReferencePointsVisibility}
        toggleTouristicContentVisibility={toggleTouristicContentVisibility}
      />
      <Credits className="absolute right-0 bottom-0 z-mapButton">{mapConfig.mapCredits}</Credits>
    </>
  );
};

const StyledMapContainer = styled(MapContainer)<{ hasDrawer: boolean }>`
  .leaflet-bottom {
    margin-bottom: ${props => (props.hasDrawer ? '40px' : 0)};
  }
`;

export default DetailsMap;

import { TouristicContent } from 'components/Map/DetailsMap/TouristicContent';
import { LatLngBoundsExpression } from 'leaflet';
import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled, { css } from 'styled-components';

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
import { VisibleSectionContext } from 'components/pages/details/VisibleSectionContext';
import { colorPalette, desktopOnly, MAX_WIDTH_MOBILE } from 'stylesheet';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
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
  displayAltimetricProfile?: boolean;
};
export const DetailsMap: React.FC<PropsType> = props => {
  const { reportVisibility, setReportVisibility } = useDetailsAndMapContext();

  const hideMap = () => {
    if (props.hideMap) {
      props.hideMap();
      setReportVisibility(false);
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

  const { visibleSection } = useContext(VisibleSectionContext);
  const mapWrapperProps = {
    ...(visibleSection === 'report' &&
      reportVisibility && {
        className: 'with-report',
      }),
  };

  const hasDrawer = Boolean(props.title);

  return (
    <MapWrapper {...mapWrapperProps}>
      <StyledMapContainer
        className="mapContainer"
        scrollWheelZoom
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
        hasDrawer={hasDrawer}
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
          reportVisibility={reportVisibility}
        />
        {props.displayAltimetricProfile === true && props.trekGeoJSON && (
          <AltimetricProfile id="altimetric-profile" trekGeoJSON={props.trekGeoJSON} />
        )}
        {isSatelliteLayerAvailable && (
          <div
            className={`absolute ${
              props.title ? 'bottom-18 desktop:bottom-6' : 'bottom-6'
            } left-6 z-mapButton`}
          >
            <MapLayerTypeToggleButton onToggleButtonClick={newType => updateTileLayer(newType)} />
          </div>
        )}
        {props.title && (
          <div className="desktop:hidden z-10">
            <DetailsMapDrawer
              title={props.title}
              trekGeoJSON={props.displayAltimetricProfile === true ? props.trekGeoJSON : ''}
              trekFamily={props.trekFamily}
              trekId={props.trekId}
            />
          </div>
        )}
        <StyledCredits hasDrawer={hasDrawer}>{mapConfig.mapCredits}</StyledCredits>
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
    </MapWrapper>
  );
};

const StyledCredits = styled(Credits)<{ hasDrawer: boolean }>`
  position: absolute;
  bottom: ${props => (props.hasDrawer ? '70px' : '5px')};
  right: 10px;
  ${desktopOnly(css`
    bottom: 0;
    right: 0;
  `)}
  z-index: 1000;
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &.with-report::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 3px solid ${colorPalette.red};
    pointer-events: none;
    @media (min-width: ${MAX_WIDTH_MOBILE}px) {
      top: 2px;
    }
  }
`;

const StyledMapContainer = styled(MapContainer)<{ hasDrawer: boolean }>`
  width: 100%;
  height: 100%;
  .leaflet-bottom {
    margin-bottom: ${props => (props.hasDrawer ? '70px' : 0)};
    ${desktopOnly(css`
      margin-bottom: 0;
    `)}
  }
`;

export default DetailsMap;

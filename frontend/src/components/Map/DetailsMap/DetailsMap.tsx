import { TouristicContent } from 'components/Map/DetailsMap/TouristicContent';
import { LatLngBoundsExpression } from 'leaflet';
import React, { useContext, useEffect } from 'react';
import { MapContainer, ScaleControl, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled, { css } from 'styled-components';

import { ArrowLeft } from 'components/Icons/ArrowLeft';

import {
  Coordinate2D,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
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
import { Check } from 'components/Icons/Check';
import { FormattedMessage } from 'react-intl';
import { InformationDesk } from 'modules/informationDesk/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { BackButton } from '../components/BackButton';

import { TrekMarkersAndCourse } from './TrekMarkersAndCourse';
import { getMapConfig } from '../config';
import { Credits } from '../components/Credits';
import { AltimetricProfile } from '../components/AltimetricProfile';
import { ControlSection } from '../components/ControlSection';
import { useDetailsMap } from './useDetailsMap';
import { MapChildren, PointWithIcon } from './MapChildren';
import DetailsMapDrawer from '../components/DetailsMapDrawer';
import { ResetView } from '../components/ResetView';

export interface TouristicContentGeometry {
  geometry:
    | PolygonGeometry
    | MultiPolygonGeometry
    | LineStringGeometry
    | MultiLineStringGeometry
    | PointGeometry
    | MultiPointGeometry;
  pictogramUri: string | null;
  name: string;
  id: string;
}

export type PropsType = {
  access?: any;
  experiences?: any;
  courses?: any;
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
  informationDesks?: InformationDesk[];
  signage?: SignageDictionary | null;
  service?: PointWithIcon[];
  infrastructure?: InfrastructureDictionary | null;
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
    informationDeskMobileVisibility,
    toggleInformationDeskVisibility,
    coursesVisibility,
    toggleCoursesVisibility,
    experiencesVisibility,
    toggleExperiencesVisibility,
    signageVisibility,
    serviceVisibility,
    toggleSignageVisibility,
    toggleServiceVisibility,
    infrastructureVisibility,
    toggleInfrastructureVisibility,
  } = useDetailsMap();
  const mapConfig = getMapConfig();

  const { mapCenter: center, coordinatesReportTouched } = useDetailsAndMapContext();

  const bounds: LatLngBoundsExpression = [
    [props.bbox.corner1.y, props.bbox.corner1.x],
    [props.bbox.corner2.y, props.bbox.corner2.x],
  ];

  const { map, setMapInstance } = useTileLayer(props.trekId, bounds);

  useEffect(() => {
    if (map && center) {
      map.setView(center);
    }
  }, [map, center]);

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
        bounds={bounds}
        hasDrawer={hasDrawer}
      >
        <TileLayer url={mapConfig.mapClassicLayerUrl} />
        {reportVisibility && coordinatesReportTouched ? (
          <BackButton icon={<Check size={20} />} onClick={hideMap}>
            <FormattedMessage id="report.mapButton.validate" />
          </BackButton>
        ) : (
          <BackButton icon={<ArrowLeft size={24} />} onClick={hideMap} />
        )}
        <ResetView />
        <ScaleControl />
        <MapLayerTypeToggleButton />
        <StyledCredits hasDrawer={hasDrawer}>{mapConfig.mapCredits}</StyledCredits>
        <ControlSection
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
          informationDeskMobileVisibility={
            props.informationDesks &&
            props.informationDesks.some(({ longitude, latitude }) => longitude && latitude)
              ? informationDeskMobileVisibility
              : null
          }
          coursesVisibility={
            Boolean(props.courses) && props.courses.length > 0 ? coursesVisibility : null
          }
          experiencesVisibility={
            Boolean(props.experiences) && props.experiences.length > 0
              ? experiencesVisibility
              : null
          }
          signageVisibility={props.signage ? signageVisibility : null}
          serviceVisibility={props.service && props.service.length > 0 ? serviceVisibility : null}
          infrastructureVisibility={props.infrastructure ? infrastructureVisibility : null}
          toggleTrekChildrenVisibility={toggleTrekChildrenVisibility}
          togglePoiVisibility={togglePoiVisibility}
          toggleReferencePointsVisibility={toggleReferencePointsVisibility}
          toggleTouristicContentVisibility={toggleTouristicContentVisibility}
          toggleInformationDeskVisibility={toggleInformationDeskVisibility}
          toggleCoursesVisibility={toggleCoursesVisibility}
          toggleExperiencesVisibility={toggleExperiencesVisibility}
          toggleSignageVisibility={toggleSignageVisibility}
          toggleServiceVisibility={toggleServiceVisibility}
          toggleInfrastructureVisibility={toggleInfrastructureVisibility}
        />
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
          courses={props.courses}
          experiences={props.experiences}
          parentId={props.trekId}
          poiPoints={props.poiPoints}
          touristicContentPoints={props.touristicContentPoints}
          pointsReference={props.pointsReference}
          trekChildrenGeometry={props.trekChildrenGeometry}
          sensitiveAreasGeometry={props.sensitiveAreas}
          signage={props.signage}
          service={props.service}
          infrastructure={props.infrastructure}
          trekChildrenMobileVisibility={trekChildrenMobileVisibility}
          poiMobileVisibility={poiMobileVisibility}
          referencePointsMobileVisibility={referencePointsMobileVisibility}
          touristicContentMobileVisibility={touristicContentMobileVisibility}
          informationDeskMobileVisibility={informationDeskMobileVisibility}
          reportVisibility={reportVisibility}
          coursesVisibility={coursesVisibility}
          experiencesVisibility={experiencesVisibility}
          informationDesks={props.informationDesks}
          signageVisibility={signageVisibility}
          serviceVisibility={serviceVisibility}
          infrastructureVisibility={infrastructureVisibility}
        />
        {props.displayAltimetricProfile === true && props.trekGeoJSON && (
          <AltimetricProfile id="altimetric-profile" trekGeoJSON={props.trekGeoJSON} />
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
      </StyledMapContainer>
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
    margin-bottom: ${props => (props.hasDrawer ? '50px' : 0)};
    ${desktopOnly(css`
      margin-bottom: 0;
    `)}
  }
`;

export default DetailsMap;

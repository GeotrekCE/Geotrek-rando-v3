import { GeometryList } from 'components/Map/DetailsMap/GeometryList';
import { LatLngBoundsExpression } from 'leaflet';
import { useContext, useEffect } from 'react';
import { MapContainer, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { ArrowLeft } from 'components/Icons/ArrowLeft';

import {
  ContentType,
  Coordinate2D,
  GeometryCollection,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
} from 'modules/interface';
import { useTileLayer } from 'hooks/useTileLayer';
import { TrekChildGeometry, TrekFamily } from 'modules/details/interface';
import { SensitiveAreaGeometry } from 'modules/sensitiveArea/interface';
import { VisibleSectionContext } from 'components/pages/details/VisibleSectionContext';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { Check } from 'components/Icons/Check';
import { FormattedMessage } from 'react-intl';
import { InformationDesk } from 'modules/informationDesk/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { ViewPoint } from 'modules/viewPoint/interface';
import { OutdoorSiteResult } from 'modules/outdoorSite/interface';
import { OutdoorCourseResult } from 'modules/outdoorCourse/interface';
import { cn } from 'services/utils/cn';
import { BackToMapButton } from 'components/BackToMapButton';
import { BackButton } from '../components/BackButton';

import { TrekMarkersAndCourse } from './TrekMarkersAndCourse';
import { getMapConfig } from '../config';
import { AltimetricProfile } from '../components/AltimetricProfile';
import { ControlSection } from '../components/ControlSection';
import { useDetailsMap } from './useDetailsMap';
import { MapChildren, PointWithIcon } from './MapChildren';
import DetailsMapDrawer from '../components/DetailsMapDrawer';
import { ResetView } from '../components/ResetView';
import TileLayerManager from '../components/TileLayerManager';
import FullscreenControl from '../components/FullScreenControl';
import ViewPointHD from '../components/ViewPointHD';
import { CRSPixel } from '../components/ViewPointHD/CRSPixel';
import { AnnotationList } from '../components/ViewPointHD/AnnotationList';
import LocateControl from '../components/LocateControl';

export interface GeometryListProps {
  geometry:
    | PolygonGeometry
    | MultiPolygonGeometry
    | LineStringGeometry
    | MultiLineStringGeometry
    | PointGeometry
    | MultiPointGeometry
    | GeometryCollection;
  pictogramUri?: string | null;
  name?: string;
  id: string;
}

export type PropsType = {
  mapId?: string;
  experiences?: OutdoorSiteResult[];
  courses?: OutdoorCourseResult[];
  poiPoints?: PointWithIcon[];
  touristicContentPoints?: GeometryListProps[];
  trekGeometry?: Coordinate2D[];
  outdoorGeometry?: GeometryListProps;
  eventGeometry?: GeometryListProps;
  trekGeoJSON?: string;
  pointsReference?: Coordinate2D[] | null;
  hideMap?: () => void;
  hasZoomControl: boolean;
  openFilterMenu?: () => void;
  hasFilters?: boolean;
  arrivalLocation?: Coordinate2D;
  departureLocation?: Coordinate2D;
  parkingLocation?: Coordinate2D;
  shouldUsePopups?: boolean;
  bbox: { corner1: Coordinate2D; corner2: Coordinate2D };
  trekFamily?: TrekFamily | null;
  trekChildrenGeometries?: TrekChildGeometry[];
  sensitiveAreas?: SensitiveAreaGeometry[];
  trekId: number;
  advisedParking?: string;
  title?: string;
  displayAltimetricProfile?: boolean;
  informationDesks?: InformationDesk[];
  signage?: SignageDictionary | null;
  service?: PointWithIcon[];
  infrastructure?: InfrastructureDictionary | null;
  viewPoints?: ViewPoint[];
  displayMap?: () => void;
  setMapId?: (id: string) => void;
  type: ContentType;
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
    viewPointVisibility,
    toggleViewPointVisibility,
    annotationViewpointVisibility,
    toggleAnnotationViewpointVisibility,
  } = useDetailsMap();
  const mapConfig = getMapConfig();

  const { mapCenter: center, coordinatesReportTouched } = useDetailsAndMapContext();

  const bounds: LatLngBoundsExpression = [
    [props.bbox.corner1.y, props.bbox.corner1.x],
    [props.bbox.corner2.y, props.bbox.corner2.x],
  ];

  const mapToDisplay = props.viewPoints?.find(({ id }) => id === props.mapId) ?? 'default';

  const { map, setMapInstance } = useTileLayer(props.trekId, bounds);

  useEffect(() => {
    if (map && center) {
      map.setView(center);
    }
  }, [map, center]);

  const { visibleSection } = useContext(VisibleSectionContext);

  useEffect(() => {
    if (visibleSection === 'report' && reportVisibility) {
      props.setMapId?.('default');
    }
  }, [visibleSection, props.setMapId]);

  const hasTitle = Boolean(props.title);

  return (
    <div
      className={cn(
        'relative size-full',
        visibleSection === 'report' &&
          reportVisibility &&
          "after:content-[''] after:absolute after:inset-0 desktop:after:top-1 after:border-solid after:border-3 after:border-red after:pointer-events-none",
      )}
    >
      <MapContainer
        className={cn(
          'mapContainer size-full',
          hasTitle && 'hasDrawer',
          props.mapId !== 'default' && props.mapId !== undefined && '!bg-black',
        )}
        scrollWheelZoom
        maxZoom={
          navigator.onLine
            ? mapConfig.maximumZoomLevel
            : Math.max(...(mapConfig?.zoomAvailableOffline ?? []))
        }
        minZoom={
          navigator.onLine ? undefined : Math.min(...(mapConfig?.zoomAvailableOffline ?? []))
        }
        zoomControl={props.hasZoomControl}
        whenCreated={setMapInstance}
        bounds={bounds}
        {...(mapToDisplay !== 'default' && { crs: CRSPixel(mapToDisplay) })}
      >
        {reportVisibility && coordinatesReportTouched ? (
          <BackButton icon={<Check size={20} />} onClick={hideMap}>
            <FormattedMessage id="report.mapButton.validate" />
          </BackButton>
        ) : (
          <BackButton icon={<ArrowLeft size={24} />} onClick={hideMap} />
        )}
        {props.hasZoomControl && <FullscreenControl />}
        {mapToDisplay !== 'default' && (
          <>
            <ViewPointHD {...mapToDisplay} />
            {'type' in mapToDisplay.annotations && annotationViewpointVisibility && (
              <>
                <ControlSection
                  annotationViewpointVisibility={annotationViewpointVisibility}
                  toggleAnnotationViewpointVisibility={toggleAnnotationViewpointVisibility}
                />
                {annotationViewpointVisibility === 'DISPLAYED' && (
                  <AnnotationList contents={mapToDisplay.annotations.features} />
                )}
              </>
            )}
            <BackToMapButton displayMap={props.displayMap} setMapId={props.setMapId} />
          </>
        )}
        {mapToDisplay === 'default' && (
          <>
            <ResetView />
            <ScaleControl />
            <TileLayerManager />
            <ControlSection
              trekChildrenVisibility={
                props.trekChildrenGeometries && props.trekChildrenGeometries.length > 0
                  ? trekChildrenMobileVisibility
                  : null
              }
              poiVisibility={
                props.poiPoints && props.poiPoints.length > 0 ? poiMobileVisibility : null
              }
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
                props.courses && props.courses.length > 0 ? coursesVisibility : null
              }
              experiencesVisibility={
                props.experiences && props.experiences.length > 0 ? experiencesVisibility : null
              }
              signageVisibility={props.signage ? signageVisibility : null}
              serviceVisibility={
                props.service && props.service.length > 0 ? serviceVisibility : null
              }
              infrastructureVisibility={props.infrastructure ? infrastructureVisibility : null}
              viewPointVisibility={props.viewPoints?.length ? viewPointVisibility : null}
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
              toggleViewPointVisiblity={toggleViewPointVisibility}
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
            {props.outdoorGeometry && (
              <GeometryList contents={[props.outdoorGeometry]} type={props.type} />
            )}
            {props.eventGeometry && (
              <GeometryList contents={[props.eventGeometry]} type={props.type} />
            )}
            <MapChildren
              courses={props.courses}
              experiences={props.experiences}
              parentId={props.trekId}
              poiPoints={props.poiPoints}
              touristicContentPoints={props.touristicContentPoints}
              pointsReference={props.pointsReference}
              trekChildrenGeometries={props.trekChildrenGeometries}
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
              viewPoints={props.viewPoints}
              viewPointVisibility={viewPointVisibility}
              setMapId={props.setMapId}
            />
            <LocateControl />
            {props.displayAltimetricProfile === true && props.trekGeoJSON && (
              <AltimetricProfile id="altimetric-profile" trekGeoJSON={props.trekGeoJSON} />
            )}
            {props.title !== undefined && (
              <div className="desktop:hidden z-10">
                <DetailsMapDrawer
                  title={props.title}
                  trekGeoJSON={props.displayAltimetricProfile === true ? props.trekGeoJSON : ''}
                  trekFamily={props.trekFamily}
                  trekId={props.trekId}
                />
              </div>
            )}
            {Number(props.viewPoints?.length) > 0 && (
              <BackToMapButton
                displayMap={props.displayMap}
                setMapId={props.setMapId}
                mapId={props.viewPoints?.[0].id}
              />
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default DetailsMap;

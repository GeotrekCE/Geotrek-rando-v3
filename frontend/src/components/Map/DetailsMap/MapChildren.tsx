import { VisibleSectionContext } from 'components/pages/details/VisibleSectionContext';
import { TrekChildGeometry } from 'modules/details/interface';
import { InformationDesk } from 'modules/informationDesk/interface';
import { Coordinate2D } from 'modules/interface';
import { OutdoorSiteResult } from 'modules/outdoorSite/interface';
import { OutdoorCourseResult } from 'modules/outdoorCourse/interface';
import { SensitiveAreaGeometry } from 'modules/sensitiveArea/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { useContext } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { Infrastructure } from 'components/Icons/Infrastructure';
import { ViewPoint } from 'modules/viewPoint/interface';
import { GeometryListProps } from './DetailsMap';

import { MarkersWithIcon } from './MarkersWithIcon';
import { PointReport } from './PointReport';
import { PointsInformationDesk } from './PointsInformationDesk';
import { PointsReference } from './PointsReference';
import { PointsSecondary } from './PointsSecondary';
import { SensitiveAreas } from './SensitiveAreas';
import { GeometryList } from './GeometryList';
import { TrekChildren } from './TrekChildren';
import { Visibility } from './useDetailsMap';
import ViewPointMarkers from './ViewPointMarkers';

export interface PointWithIcon {
  location: { x: number; y: number };
  pictogramUri: string;
  name: string;
  id: string;
}

type Props = {
  courses?: OutdoorCourseResult[];
  experiences?: OutdoorSiteResult[];
  poiPoints?: PointWithIcon[];
  touristicContentPoints?: GeometryListProps[];
  pointsReference?: Coordinate2D[] | null;
  trekChildrenGeometries?: TrekChildGeometry[];
  sensitiveAreasGeometry?: SensitiveAreaGeometry[];
  trekChildrenMobileVisibility: Visibility;
  referencePointsMobileVisibility: Visibility;
  poiMobileVisibility: Visibility;
  touristicContentMobileVisibility: Visibility;
  coursesVisibility: Visibility;
  experiencesVisibility: Visibility;
  reportVisibility: boolean;
  parentId?: number;
  informationDeskMobileVisibility: Visibility;
  informationDesks?: InformationDesk[];
  signageVisibility: Visibility;
  signage?: SignageDictionary | null;
  serviceVisibility: Visibility;
  service?: PointWithIcon[];
  infrastructureVisibility: Visibility;
  infrastructure?: InfrastructureDictionary | null;
  viewPointVisibility?: Visibility;
  viewPoints?: ViewPoint[];
  setMapId?: (id: string) => void;
};

export const MapChildren: React.FC<Props> = props => {
  const { visibleSection } = useContext(VisibleSectionContext);
  const isMobile = useMediaPredicate('(max-width: 1024px)');

  return (
    <>
      {(visibleSection === 'itinerancySteps' ||
        visibleSection === 'courses' ||
        props.trekChildrenMobileVisibility === 'DISPLAYED') && (
        <TrekChildren
          trekChildrenGeometries={props.trekChildrenGeometries}
          parentId={props.parentId}
        />
      )}

      {(visibleSection === 'description' ||
        props.referencePointsMobileVisibility === 'DISPLAYED') && (
        <PointsReference pointsReference={props.pointsReference ?? undefined} />
      )}

      {(visibleSection === 'subsites' || props.experiencesVisibility === 'DISPLAYED') && (
        <GeometryList
          contents={
            props.experiences?.map(e => ({
              ...e,
              pictogramUri: e.category?.pictogramUri,
            })) as GeometryListProps[]
          }
          type="OUTDOOR_SITE"
        />
      )}

      {(visibleSection === 'courses' || props.coursesVisibility === 'DISPLAYED') && (
        <GeometryList
          contents={
            props.courses?.map(e => ({
              ...e,
              pictogramUri: null,
            })) as GeometryListProps[]
          }
          type="OUTDOOR_SITE"
        />
      )}

      {(visibleSection === 'poi' || props.poiMobileVisibility === 'DISPLAYED') && (
        <MarkersWithIcon points={props.poiPoints} />
      )}

      {(visibleSection === 'touristicContent' ||
        props.touristicContentMobileVisibility === 'DISPLAYED') && (
        <GeometryList contents={props.touristicContentPoints} />
      )}

      {visibleSection === 'sensitiveAreas' && (
        <SensitiveAreas contents={props.sensitiveAreasGeometry} />
      )}

      {(visibleSection === 'practicalInformations' ||
        props.informationDeskMobileVisibility === 'DISPLAYED') && (
        <PointsInformationDesk informationDesks={props.informationDesks} />
      )}

      {props.signageVisibility === 'DISPLAYED' && <PointsSecondary dictionary={props.signage} />}

      {props.infrastructureVisibility === 'DISPLAYED' && (
        <PointsSecondary dictionary={props.infrastructure} icon={Infrastructure} />
      )}

      {props.serviceVisibility === 'DISPLAYED' && <MarkersWithIcon points={props.service} />}

      {(isMobile || visibleSection === 'report') && props.reportVisibility && <PointReport />}

      {(props.viewPointVisibility === 'DISPLAYED' || visibleSection === 'medias') && (
        <ViewPointMarkers viewPoints={props.viewPoints} setMapId={props.setMapId} />
      )}
    </>
  );
};

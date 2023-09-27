import { Florist } from 'components/Icons/Florist';
import { Signage } from 'components/Icons/Signage';
import { Infrastructure } from 'components/Icons/Infrastructure';
import { MapPin } from 'components/Icons/MapPin';
import { ViewPoint } from 'components/Icons/ViewPoint';
import { Line } from './Line';
import IconLocation from './IconLocation';
import IconInfo from './IconInfo';
import IconDrapeau from './IconDrapeau';
import IconPatrimoine from './IconPatrimoine';
import IconOutdoorSite from './IconOutdoorSite';
import IconOutdoorRoute from './IconOutdoorRoute';
import { ControlSectionProps } from '../ControlSection';

export const ControlPanel: React.FC<ControlSectionProps & { id: string }> = ({
  id,
  trekChildrenVisibility,
  toggleTrekChildrenVisibility,
  poiVisibility,
  togglePoiVisibility,
  referencePointsVisibility,
  toggleReferencePointsVisibility,
  touristicContentVisibility,
  toggleTouristicContentVisibility,
  informationDeskMobileVisibility,
  toggleInformationDeskVisibility,
  coursesVisibility,
  toggleCoursesVisibility,
  experiencesVisibility,
  toggleExperiencesVisibility,
  signageVisibility,
  toggleSignageVisibility,
  serviceVisibility,
  toggleServiceVisibility,
  infrastructureVisibility,
  toggleInfrastructureVisibility,
  annotationViewpointVisibility,
  toggleAnnotationViewpointVisibility,
  viewPointVisibility,
  toggleViewPointVisiblity,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-lg p-4 rounded-2xl w-[230px] gap-4" id={id}>
      {trekChildrenVisibility && toggleTrekChildrenVisibility && (
        <Line
          icon={IconLocation}
          active={trekChildrenVisibility === 'DISPLAYED'}
          toggle={toggleTrekChildrenVisibility}
          transKey="search.map.panel.trekChildren"
        />
      )}
      {poiVisibility && togglePoiVisibility && (
        <Line
          icon={Florist}
          active={poiVisibility === 'DISPLAYED'}
          toggle={togglePoiVisibility}
          transKey="search.map.panel.poi"
        />
      )}
      {referencePointsVisibility && toggleReferencePointsVisibility && (
        <Line
          icon={IconDrapeau}
          active={referencePointsVisibility === 'DISPLAYED'}
          toggle={toggleReferencePointsVisibility}
          transKey="search.map.panel.referencePoints"
        />
      )}
      {touristicContentVisibility && toggleTouristicContentVisibility && (
        <Line
          icon={IconPatrimoine}
          active={touristicContentVisibility === 'DISPLAYED'}
          toggle={toggleTouristicContentVisibility}
          transKey="search.map.panel.touristicContent"
        />
      )}
      {informationDeskMobileVisibility && toggleInformationDeskVisibility && (
        <Line
          icon={IconInfo}
          active={informationDeskMobileVisibility === 'DISPLAYED'}
          toggle={toggleInformationDeskVisibility}
          transKey="search.map.panel.informationDesks"
        />
      )}
      {coursesVisibility && toggleCoursesVisibility && (
        <Line
          icon={IconOutdoorRoute}
          active={coursesVisibility === 'DISPLAYED'}
          toggle={toggleCoursesVisibility}
          transKey="search.map.panel.courses"
        />
      )}
      {experiencesVisibility && toggleExperiencesVisibility && (
        <Line
          icon={IconOutdoorSite}
          active={experiencesVisibility === 'DISPLAYED'}
          toggle={toggleExperiencesVisibility}
          transKey="search.map.panel.experiences"
        />
      )}
      {signageVisibility && toggleSignageVisibility && (
        <Line
          icon={Signage}
          active={signageVisibility === 'DISPLAYED'}
          toggle={toggleSignageVisibility}
          transKey="search.map.panel.signage"
        />
      )}
      {infrastructureVisibility && toggleInfrastructureVisibility && (
        <Line
          icon={Infrastructure}
          active={infrastructureVisibility === 'DISPLAYED'}
          toggle={toggleInfrastructureVisibility}
          transKey="search.map.panel.infrastructure"
        />
      )}
      {serviceVisibility && toggleServiceVisibility && (
        <Line
          icon={MapPin}
          active={serviceVisibility === 'DISPLAYED'}
          toggle={toggleServiceVisibility}
          transKey="search.map.panel.service"
        />
      )}
      {viewPointVisibility && toggleViewPointVisiblity && (
        <Line
          icon={ViewPoint}
          active={viewPointVisibility === 'DISPLAYED'}
          toggle={toggleViewPointVisiblity}
          transKey="viewPoint.title"
        />
      )}
      {annotationViewpointVisibility && toggleAnnotationViewpointVisibility && (
        <Line
          icon={IconInfo}
          active={annotationViewpointVisibility === 'DISPLAYED'}
          toggle={toggleAnnotationViewpointVisibility}
          transKey="search.map.panel.annotations"
        />
      )}
    </div>
  );
};

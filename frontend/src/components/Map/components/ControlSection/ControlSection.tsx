import { ChevronUp } from 'components/Icons/ChevronUp';
import { Visibility } from 'components/Map/DetailsMap/useDetailsMap';
import { ControlPosition } from 'leaflet';
import { cn } from 'services/utils/cn';
import { useId } from 'react';
import { ControlButton } from '../ControlButton';
import { useControlSection } from './useControlSection';
import { ControlPanel } from './ControlPanel';
import { Layers } from './Layers';
import Control from '../CustomControl';

export interface ControlSectionProps {
  trekChildrenVisibility?: Visibility;
  toggleTrekChildrenVisibility?: () => void;
  poiVisibility?: Visibility;
  togglePoiVisibility?: () => void;
  referencePointsVisibility?: Visibility;
  toggleReferencePointsVisibility?: () => void;
  touristicContentVisibility?: Visibility;
  toggleTouristicContentVisibility?: () => void;
  informationDeskMobileVisibility?: Visibility;
  toggleInformationDeskVisibility?: () => void;
  coursesVisibility?: Visibility;
  toggleCoursesVisibility?: () => void;
  experiencesVisibility?: Visibility;
  toggleExperiencesVisibility?: () => void;
  signageVisibility?: Visibility;
  toggleSignageVisibility?: () => void;
  serviceVisibility?: Visibility;
  toggleServiceVisibility?: () => void;
  infrastructureVisibility?: Visibility;
  toggleInfrastructureVisibility?: () => void;
  annotationViewpointVisibility?: Visibility;
  toggleAnnotationViewpointVisibility?: () => void;
  viewPointVisibility?: Visibility;
  toggleViewPointVisiblity?: () => void;
  className?: string;
  position?: ControlPosition;
}

export const ControlSection: React.FC<ControlSectionProps> = ({
  className = '',
  position = 'topright',
  ...props
}) => {
  const { controlSectionState, toggleControlSection } = useControlSection();
  const idControlSectionElement = useId();

  if (Object.keys(props).length === 0) {
    return null;
  }

  const icon = controlSectionState === 'COLLAPSED' ? <Layers size={24} /> : <ChevronUp size={30} />;

  return (
    <Control position={position}>
      <div className={cn('flex flex-col items-end', className)}>
        <ControlButton
          aria-expanded={controlSectionState === 'EXPANDED' ? 'true' : 'false'}
          aria-controls={idControlSectionElement}
          icon={icon}
          onClick={toggleControlSection}
        />
        {controlSectionState === 'EXPANDED' && (
          <ControlPanel id={idControlSectionElement} {...props} />
        )}
      </div>
    </Control>
  );
};

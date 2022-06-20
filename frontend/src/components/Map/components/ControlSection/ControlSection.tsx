import { ChevronUp } from 'components/Icons/ChevronUp';
import { Visibility } from 'components/Map/DetailsMap/useDetailsMap';
import { ControlPosition } from 'leaflet';
import { ControlButton } from '../ControlButton';
import { useControlSection } from './useControlSection';
import { ControlPanel } from './ControlPanel';
import { Layers } from './Layers';
import Control from '../CustomControl';

export interface ControlSectionProps {
  trekChildrenVisibility: Visibility;
  toggleTrekChildrenVisibility: () => void;
  poiVisibility: Visibility;
  togglePoiVisibility: () => void;
  referencePointsVisibility: Visibility;
  toggleReferencePointsVisibility: () => void;
  touristicContentVisibility: Visibility;
  toggleTouristicContentVisibility: () => void;
  informationDeskMobileVisibility: Visibility;
  toggleInformationDeskVisibility: () => void;
  coursesVisibility: Visibility;
  toggleCoursesVisibility: () => void;
  experiencesVisibility: Visibility;
  toggleExperiencesVisibility: () => void;
  signageVisibility: Visibility;
  toggleSignageVisibility: () => void;
  serviceVisibility: Visibility;
  toggleServiceVisibility: () => void;
  infrastructureVisibility: Visibility;
  toggleInfrastructureVisibility: () => void;
  className?: string;
  position?: ControlPosition;
}

export const ControlSection: React.FC<ControlSectionProps> = ({
  className = '',
  position = 'topright',
  ...props
}) => {
  const { controlSectionState, expandControlSection, collapseControlSection } = useControlSection();

  return (
    <Control position={position}>
      <div className={`flex flex-col items-end ${className}`}>
        {controlSectionState === 'COLLAPSED' && (
          <ControlButton icon={<Layers size={24} />} onClick={expandControlSection} />
        )}
        {controlSectionState === 'EXPANDED' && (
          <>
            <ControlButton icon={<ChevronUp size={30} />} onClick={collapseControlSection} />
            <ControlPanel {...props} />
          </>
        )}
      </div>
    </Control>
  );
};

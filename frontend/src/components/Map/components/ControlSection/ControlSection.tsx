import { ChevronUp } from 'components/Icons/ChevronUp';
import { Visibility } from 'components/Map/DetailsMap/useDetailsMap';
import { ControlButton } from '../ControlButton';
import { useControlSection } from './useControlSection';
import { ControlPanel } from './ControlPanel';
import { Layers } from './Layers';

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
  className?: string;
}

export const ControlSection: React.FC<ControlSectionProps> = ({ className = '', ...props }) => {
  const { controlSectionState, expandControlSection, collapseControlSection } = useControlSection();

  return (
    <div className={`absolute top-8 right-8 flex flex-col items-end ${className}`}>
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
  );
};

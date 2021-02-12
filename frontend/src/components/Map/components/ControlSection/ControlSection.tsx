import { ChevronDown } from 'components/Icons/ChevronUp';
import { Florist } from 'components/Icons/Florist';
import { Sliders } from 'components/Icons/Sliders';
import { Visibility } from 'components/Map/DetailsMap/useDetailsMap';
import { ControlButton } from '../ControlButton';
import { useControlSection } from './useControlSection';

interface ControlSectionProps {
  poiVisibility?: Visibility;
  togglePoiVisibility?: () => void;
  className?: string;
}

export const ControlSection: React.FC<ControlSectionProps> = ({
  poiVisibility,
  togglePoiVisibility,
  className,
}) => {
  const { controlSectionState, expandControlSection, collapseControlSection } = useControlSection();
  return (
    <div className={`absolute top-8 right-8 ${className ?? ''}`}>
      {controlSectionState === 'COLLAPSED' && (
        <ControlButton icon={<Sliders size={24} />} onClick={expandControlSection} />
      )}
      {controlSectionState === 'EXPANDED' && (
        <>
          <ControlButton icon={<ChevronDown size={24} />} onClick={collapseControlSection} />
          {poiVisibility !== null && (
            <ControlButton
              icon={<Florist size={24} />}
              onClick={togglePoiVisibility}
              active={poiVisibility === 'DISPLAYED'}
            />
          )}
        </>
      )}
    </div>
  );
};

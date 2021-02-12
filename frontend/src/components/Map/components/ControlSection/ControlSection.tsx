import { ChevronUp } from 'components/Icons/ChevronUp';
import { Map } from 'components/Icons/Map';
import { Heart } from 'components/Icons/Heart';
import { Museum } from 'components/Icons/Museum';
import { Sliders } from 'components/Icons/Sliders';
import { ControlButton } from '../ControlButton';
import { useControlSection } from './useControlSection';

interface ControlSectionProps {
  poiControl?: boolean;
  descriptionControl?: boolean;
  touristicContentControl?: boolean;
  className?: string;
}

export const ControlSection: React.FC<ControlSectionProps> = ({
  poiControl = false,
  descriptionControl = false,
  touristicContentControl = false,
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
          {poiControl && <ControlButton icon={<Museum size={24} />} />}
          {descriptionControl && <ControlButton icon={<Map size={24} />} />}
          {touristicContentControl && <ControlButton icon={<Heart size={24} />} />}
          <ControlButton icon={<ChevronUp size={24} />} onClick={collapseControlSection} />
        </>
      )}
    </div>
  );
};

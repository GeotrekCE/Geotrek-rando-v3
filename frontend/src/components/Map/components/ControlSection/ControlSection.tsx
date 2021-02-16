import { ChevronUp } from 'components/Icons/ChevronUp';
import { Flag } from 'components/Icons/Flag';
import { MapPin } from 'components/Icons/MapPin';
import { Florist } from 'components/Icons/Florist';
import { Sliders } from 'components/Icons/Sliders';
import { Visibility } from 'components/Map/DetailsMap/useDetailsMap';
import { Point } from 'components/Icons/Point';
import { ControlButton } from '../ControlButton';
import { useControlSection } from './useControlSection';

interface ControlSectionProps {
  trekChildrenVisibility?: Visibility;
  toggleTrekChildrenVisibility?: () => void;
  poiVisibility?: Visibility;
  togglePoiVisibility?: () => void;
  referencePointsVisibility?: Visibility;
  toggleReferencePointsVisibility: () => void;
  touristicContentVisibility?: Visibility;
  toggleTouristicContentVisibility: () => void;
  className?: string;
}

export const ControlSection: React.FC<ControlSectionProps> = ({
  trekChildrenVisibility,
  toggleTrekChildrenVisibility,
  poiVisibility,
  togglePoiVisibility,
  referencePointsVisibility,
  toggleReferencePointsVisibility,
  touristicContentVisibility,
  toggleTouristicContentVisibility,
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
          <ControlButton icon={<ChevronUp size={24} />} onClick={collapseControlSection} />
          {trekChildrenVisibility !== null && (
            <ControlButton
              icon={<Flag size={24} />}
              onClick={toggleTrekChildrenVisibility}
              active={trekChildrenVisibility === 'DISPLAYED'}
            />
          )}
          {poiVisibility !== null && (
            <ControlButton
              icon={<Florist size={24} />}
              onClick={togglePoiVisibility}
              active={poiVisibility === 'DISPLAYED'}
            />
          )}
          {referencePointsVisibility !== null && (
            <ControlButton
              icon={<Point size={20} />}
              onClick={toggleReferencePointsVisibility}
              active={referencePointsVisibility === 'DISPLAYED'}
            />
          )}
          {touristicContentVisibility !== null && (
            <ControlButton
              icon={<MapPin size={24} />}
              onClick={toggleTouristicContentVisibility}
              active={touristicContentVisibility === 'DISPLAYED'}
            />
          )}
        </>
      )}
    </div>
  );
};

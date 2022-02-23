import { ChevronUp } from 'components/Icons/ChevronUp';
import { Flag } from 'components/Icons/Flag';
import { MapPin } from 'components/Icons/MapPin';
import { Florist } from 'components/Icons/Florist';
import { Sliders } from 'components/Icons/Sliders';
import { Visibility } from 'components/Map/DetailsMap/useDetailsMap';
import { Point } from 'components/Icons/Point';
import styled from 'styled-components';
import { ControlButton } from '../ControlButton';
import { useControlSection } from './useControlSection';
import { ControlPanel } from './ControlPanel';
import { Layers } from './Layers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

interface ControlSectionProps {
  trekChildrenVisibility: Visibility;
  toggleTrekChildrenVisibility: () => void;
  poiVisibility: Visibility;
  togglePoiVisibility: () => void;
  referencePointsVisibility: Visibility;
  toggleReferencePointsVisibility: () => void;
  touristicContentVisibility: Visibility;
  toggleTouristicContentVisibility: () => void;
  className: string;
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
    <Wrapper className={`absolute top-8 right-8 ${className ?? ''}`}>
      {controlSectionState === 'COLLAPSED' && (
        <ControlButton icon={<Layers size={24} />} onClick={expandControlSection} />
      )}
      {controlSectionState === 'EXPANDED' && (
        <>
          <ControlButton icon={<ChevronUp size={30} />} onClick={collapseControlSection} />
          <ControlPanel
            trekChildrenVisibility={trekChildrenVisibility}
            toggleTrekChildrenVisibility={toggleTrekChildrenVisibility}
            poiVisibility={poiVisibility}
            togglePoiVisibility={togglePoiVisibility}
            referencePointsVisibility={referencePointsVisibility}
            toggleReferencePointsVisibility={toggleReferencePointsVisibility}
            touristicContentVisibility={touristicContentVisibility}
            toggleTouristicContentVisibility={toggleTouristicContentVisibility}
          />
        </>
      )}
    </Wrapper>
  );
};

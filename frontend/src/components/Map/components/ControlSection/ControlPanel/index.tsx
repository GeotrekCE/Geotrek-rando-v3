import { Visibility } from 'components/Map/DetailsMap/useDetailsMap';
import styled from 'styled-components';
import { Line } from './Line';
import IconLocation from './IconLocation';
import IconInfo from './IconInfo';
import IconDrapeau from './IconDrapeau';
import IconPatrimoine from './IconPatrimoine';

const Wrapper = styled.div`
  background: white;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);
  padding: 16px;
  border-radius: 16px;
  width: 230px;
  display: flex;
  flex-flow: column;

  & div {
    margin-bottom: 8px;
  }

  & div:last-child {
    margin-bottom: 0;
  }
`;

export const ControlPanel: React.FC<{
  trekChildrenVisibility: Visibility;
  toggleTrekChildrenVisibility: () => void;
  poiVisibility: Visibility;
  togglePoiVisibility: () => void;
  referencePointsVisibility: Visibility;
  toggleReferencePointsVisibility: () => void;
  touristicContentVisibility: Visibility;
  toggleTouristicContentVisibility: () => void;
}> = ({
  trekChildrenVisibility,
  toggleTrekChildrenVisibility,
  poiVisibility,
  togglePoiVisibility,
  referencePointsVisibility,
  toggleReferencePointsVisibility,
  touristicContentVisibility,
  toggleTouristicContentVisibility,
}) => {
  return (
    <Wrapper>
      {trekChildrenVisibility !== null && (
        <Line
          Icon={IconLocation}
          active={trekChildrenVisibility === 'DISPLAYED'}
          toggle={toggleTrekChildrenVisibility}
          transKey="search.map.panel.trekChildren"
        />
      )}
      {poiVisibility !== null && (
        <Line
          Icon={IconInfo}
          active={poiVisibility === 'DISPLAYED'}
          toggle={togglePoiVisibility}
          transKey="search.map.panel.poi"
        />
      )}
      {referencePointsVisibility !== null && (
        <Line
          Icon={IconDrapeau}
          active={referencePointsVisibility === 'DISPLAYED'}
          toggle={toggleReferencePointsVisibility}
          transKey="search.map.panel.referencePoints"
        />
      )}
      {touristicContentVisibility !== null && (
        <Line
          Icon={IconPatrimoine}
          active={touristicContentVisibility === 'DISPLAYED'}
          toggle={toggleTouristicContentVisibility}
          transKey="search.map.panel.touristicContent"
        />
      )}
    </Wrapper>
  );
};

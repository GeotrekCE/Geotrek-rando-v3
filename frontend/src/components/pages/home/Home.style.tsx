import styled from 'styled-components';
import { borderRadius, getSpacing, typography } from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(10)};
`;
HomeContainer.displayName = 'HomeContainer';

export const Logo = styled.img`
  width: ${getSpacing(32)};
  margin-bottom: ${getSpacing(4)};
`;
Logo.displayName = 'Logo';

export const Title = styled.h1`
  ${typography.h1}
  margin-bottom: ${getSpacing(12)};
`;
Title.displayName = 'Title';

export const HowTo = styled.div`
  padding: ${getSpacing(6)};
  width: 100%;
  max-width: ${getSpacing(120)};
  box-sizing: border-box;
  border-radius: ${borderRadius.large};
`;
HowTo.displayName = 'HowTo';

export const DescriptionList = styled.ul`
  list-style: disc;
  margin-left: ${getSpacing(4)};
`;
DescriptionList.displayName = 'DescriptionList';

export const DescriptionLine = styled.li`
  ${typography.light}
  padding-left: ${getSpacing(1)};
  margin-bottom: ${getSpacing(1)};
`;
DescriptionLine.displayName = 'DescriptionLine';

export const Code = styled.code`
  ${typography.code}
  padding: ${getSpacing(1)};
`;
Code.displayName = 'Code';

export const ListMapContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: space-between;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
ListMapContainer.displayName = 'ListMapContainer';

export const ListContainer = styled.div`
  flex: 1;
`;
ListContainer.displayName = 'ListContainer';

export const MapContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    height: 500px;
    width: 100%;
  }
`;
MapContainer.displayName = 'MapContainer';

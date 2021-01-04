import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing, typography, zIndex } from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
HomeContainer.displayName = 'HomeContainer';

export const TopContainer = styled.div`
  text-align: center;
  height: ${getSpacing(150)};
  padding-top: ${getSpacing(80)};
  padding-left: ${getSpacing(20)};
  padding-right: ${getSpacing(20)};
  background-color: ${colorPalette.amberDark};
  background-image: url('/images/home-background.jpg');
  background-size: cover;
  background-position: center;
`;
TopContainer.displayName = 'TopContainer';

export const WelcomeText = styled.h1`
  ${typography.h1}
  font-size: 44px;
  color: ${colorPalette.white};
`;

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
  z-index: ${zIndex.content};

  @media (max-width: 768px) {
    height: 500px;
    width: 100%;
  }
`;
MapContainer.displayName = 'MapContainer';

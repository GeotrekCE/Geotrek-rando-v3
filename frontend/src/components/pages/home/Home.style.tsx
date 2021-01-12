import styled, { css } from 'styled-components';
import {
  borderRadius,
  colorPalette,
  desktopOnly,
  getSpacing,
  oldGetSpacing,
  typography,
  zIndex,
} from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
`;
HomeContainer.displayName = 'HomeContainer';

export const TopContainer = styled.div`
  text-align: center;
  background-color: ${colorPalette.primary3};
  background-image: url('/images/home-background.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  text-shadow: 1px 1px 2px #00000070, 0 0 20px #00000040;
  justify-content: center;
  align-items: center;
  height: 244px;
  padding: ${getSpacing(6)};
  ${desktopOnly(css`
    height: 80vh;
    padding-top: 30vh;
    padding-inline: 15vw;
  `)}
`;
TopContainer.displayName = 'TopContainer';

export const Logo = styled.img`
  width: ${oldGetSpacing(32)};
  margin-bottom: ${oldGetSpacing(4)};
`;
Logo.displayName = 'Logo';

export const Title = styled.h1`
  ${typography.h1}
  margin-bottom: ${oldGetSpacing(12)};
`;
Title.displayName = 'Title';

export const HowTo = styled.div`
  padding: ${oldGetSpacing(6)};
  width: 100%;
  max-width: ${oldGetSpacing(120)};
  box-sizing: border-box;
  border-radius: ${borderRadius.large};
`;
HowTo.displayName = 'HowTo';

export const DescriptionList = styled.ul`
  list-style: disc;
  margin-left: ${oldGetSpacing(4)};
`;
DescriptionList.displayName = 'DescriptionList';

export const DescriptionLine = styled.li`
  ${typography.light}
  padding-left: ${oldGetSpacing(1)};
  margin-bottom: ${oldGetSpacing(1)};
`;
DescriptionLine.displayName = 'DescriptionLine';

export const Code = styled.code`
  ${typography.code}
  padding: ${oldGetSpacing(1)};
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

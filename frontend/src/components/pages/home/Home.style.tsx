import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing, zIndex } from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
`;
HomeContainer.displayName = 'HomeContainer';

export const TopContainer = styled.div<{ backgroundUrl: string }>`
  text-align: center;
  background-color: ${colorPalette.primary3};
  background-image: linear-gradient(
      180deg,
      transparent 0%,
      ${colorPalette.home.gradientOnImages} 100%
    ),
    ${props => `url(${props.backgroundUrl})`};
  background-size: cover;
  background-position: center;
  display: flex;
  text-shadow: 0 0 20px ${colorPalette.home.shadowOnImages};
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

export const MapContainer = styled.div`
  flex: 1;
  z-index: ${zIndex.content};

  @media (max-width: 768px) {
    height: 500px;
    width: 100%;
  }
`;
MapContainer.displayName = 'MapContainer';

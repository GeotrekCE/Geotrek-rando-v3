import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing, zIndex } from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
`;
HomeContainer.displayName = 'HomeContainer';

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

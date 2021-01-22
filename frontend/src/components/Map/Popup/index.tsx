import React from 'react';
import styled from 'styled-components';
import { Popup as LeafletPopup } from 'react-leaflet';
import { getSpacing } from 'stylesheet';

export const Popup: React.FC = () => {
  return (
    <StyledPopup closeButton={false}>
      <div style={{ height: 200, width: 200 }}>Coucou</div>
    </StyledPopup>
  );
};

const StyledPopup = styled(LeafletPopup)`
  .leaflet-popup-content {
    margin: 0;
  }

  .leaflet-popup-content-wrapper {
    border-radius: ${getSpacing(4)};
  }
`;

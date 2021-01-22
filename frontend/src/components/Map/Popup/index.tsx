import React from 'react';
import styled, { css } from 'styled-components';
import { Popup as LeafletPopup } from 'react-leaflet';
import { desktopOnly, getSpacing } from 'stylesheet';

export const Popup: React.FC = () => {
  return (
    <StyledPopup closeButton={false}>
      <CoverImage src="https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/501/019264_hd_1.jpg" />
      <div>Coucou</div>
    </StyledPopup>
  );
};

const desktopWidth = 288;
const desktopImgHeight = 122;
const mobileWidth = 215;
const mobileImgHeight = 133;

const StyledPopup = styled(LeafletPopup)`
  .leaflet-popup-content {
    margin: 0;

    display: flex;
    flex-direction: column;
  }

  .leaflet-popup-content-wrapper {
    padding: 0;

    border-radius: ${getSpacing(4)};
    overflow: hidden;

    width: ${mobileWidth}px;
    ${desktopOnly(css`
      width: ${desktopWidth}px;
    `)};
  }
`;

const CoverImage = styled.img`
  height: ${mobileImgHeight}px;
  ${desktopOnly(css`
    height: ${desktopImgHeight}px;
  `)}
  object-fit: cover;
`;

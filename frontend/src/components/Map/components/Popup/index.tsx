import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Popup as LeafletPopup, Tooltip as LeafletTooltip } from 'react-leaflet';
import { FormattedMessage } from 'react-intl';
import Loader from 'react-loader';

import { colorPalette, desktopOnly, getSpacing } from 'stylesheet';
import { textEllipsisAfterNLines } from 'services/cssHelpers';
import { Button as RawButton } from 'components/Button';
import { generateResultDetailsUrl } from 'components/pages/search/utils';
import { generateTouristicContentUrl } from 'components/pages/details/utils';

import Link from 'components/Link';
import { usePopupResult } from '../../hooks/usePopupResult';

interface Props {
  id: number;
  parentId?: number;
  handleOpen?: () => void;
  handleClose?: () => void;
  type: 'TREK' | 'TOURISTIC_CONTENT';
}

interface PropsPC {
  showButton: boolean;
  id: number;
  type: 'TREK' | 'TOURISTIC_CONTENT';
  parentId?: number;
}
const PopupContent: React.FC<PropsPC> = ({ showButton, id, type, parentId }) => {
  const { isLoading, trekPopupResult } = usePopupResult(id.toString(), true, type);

  return (
    <Loader
      loaded={!isLoading}
      options={{
        color: colorPalette.primary1,
      }}
    >
      {trekPopupResult && (
        <div className="flex flex-col">
          <CoverImage src={trekPopupResult.imgUrl} />
          <div className="p-4">
            <span className="text-P2 mb-1 text-greyDarkColored hidden desktop:inline">
              {trekPopupResult.place}
            </span>
            <Title className="text-Mobile-C1 text-primary1 font-bold desktop:text-H4">
              {trekPopupResult.title}
            </Title>
            {showButton && (
              <Link
                href={
                  type === 'TREK'
                    ? generateResultDetailsUrl(id, trekPopupResult.title, parentId)
                    : generateTouristicContentUrl(id, trekPopupResult.title)
                }
              >
                <Button type="button">
                  <span className="text-center w-full">
                    <FormattedMessage id="search.map.seeResult" />
                  </span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </Loader>
  );
};

export const Popup: React.FC<Props> = ({ id, parentId, handleOpen, handleClose, type }) => {
  const [hideTooltip, setHideTooltip] = useState<boolean>(false);

  return (
    <>
      {!hideTooltip && (
        <StyledTooltip>
          <PopupContent type={type} id={id} showButton={false} />
        </StyledTooltip>
      )}
      <StyledPopup
        closeButton={false}
        onOpen={() => {
          setHideTooltip(true);
          handleOpen && handleOpen();
        }}
        onClose={() => {
          setHideTooltip(false);
          handleClose && handleClose();
        }}
        offset={[0, -12]}
      >
        <PopupContent type={type} id={id} showButton={true} parentId={parentId} />
      </StyledPopup>
    </>
  );
};

const desktopWidth = 288;
const desktopImgHeight = 122;
const mobileWidth = 215;
const mobileImgHeight = 133;

const Button = styled(RawButton)`
  margin-top: ${getSpacing(4)};
  width: 100%;
  text-align: center;
`;

const Title = styled.span`
  ${textEllipsisAfterNLines(2)}

  ${desktopOnly(css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  `)}
`;

const StyledTooltip = styled(LeafletTooltip)`
  padding: 0;
  border: 0px !important;
  border-radius: ${getSpacing(4)} !important;
  overflow: hidden;
  white-space: initial !important;
  width: ${mobileWidth}px;
  ${desktopOnly(css`
    width: ${desktopWidth}px;
  `)};
`;

const StyledPopup = styled(LeafletPopup)`
  .leaflet-popup-content {
    margin: 0;

    // Show the loader properly
    position: relative;
    min-height: 120px;
    min-width: 120px;
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

  // Removes native leaflet popup triangle below the content
  // https://stackoverflow.com/a/51457598/14707543
  .leaflet-popup-tip {
    background: rgba(0, 0, 0, 0) !important;
    box-shadow: none !important;
  }
`;

const CoverImage = styled.img`
  height: ${mobileImgHeight}px;
  ${desktopOnly(css`
    height: ${desktopImgHeight}px;
  `)}
  object-fit: cover;
`;

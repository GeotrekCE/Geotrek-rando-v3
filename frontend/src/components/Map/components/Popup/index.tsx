import { useState } from 'react';
import { routes } from 'services/routes';
import styled, { css } from 'styled-components';
import { Popup as LeafletPopup, Tooltip as LeafletTooltip } from 'react-leaflet';
import { FormattedMessage } from 'react-intl';
import Loader from 'components/Loader';

import { desktopOnly, getSpacing } from 'stylesheet';
import { Button } from 'components/Button';
import { generateResultDetailsUrl } from 'components/pages/search/utils';

import Link from 'components/Link';
import { PopupResult } from 'modules/trekResult/interface';
import { usePopupResult } from '../../hooks/usePopupResult';

interface Props {
  id: number | string;
  parentId?: number;
  handleOpen?: () => void;
  handleClose?: () => void;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT' | null;
  content?: PopupResult;
}

interface PropsPC {
  showButton: boolean;
  id: number | string;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT' | null;
  parentId?: number;
  content?: PopupResult;
}

const getRoute = (type: PropsPC['type']) => {
  if (type === 'TOURISTIC_CONTENT') return routes.TOURISTIC_CONTENT;
  if (type === 'OUTDOOR_SITE') return routes.OUTDOOR_SITE;
  if (type === 'TOURISTIC_EVENT') return routes.TOURISTIC_EVENT;
  if (type === 'TREK') return routes.TREK;
  return routes.TREK;
};

const PopupContent: React.FC<PropsPC> = ({ showButton, id, type, parentId, content }) => {
  let isLoading = false;
  let trekPopupResult = null;

  if (!content && type) {
    const popupResult = usePopupResult(id.toString(), true, type);
    isLoading = popupResult.isLoading;
    trekPopupResult = popupResult.trekPopupResult;
  } else {
    trekPopupResult = content;
  }

  return (
    <Loader className="absolute inset-0" loaded={!isLoading}>
      {trekPopupResult && (
        <div className="flex flex-col">
          <CoverImage src={trekPopupResult.imgUrl} />
          <div className="p-4">
            {trekPopupResult.place && (
              <span className="text-P2 mb-1 text-greyDarkColored hidden desktop:inline">
                {trekPopupResult.place}
              </span>
            )}
            <h3 className="text-Mobile-C1 text-primary1 font-bold desktop:text-H4 line-clamp-2">
              {trekPopupResult.title}
            </h3>
            {showButton && (
              <>
                {trekPopupResult?.button?.onClick ? (
                  <Button className="mt-4 w-full" {...trekPopupResult.button}>
                    <span className="w-full">
                      <FormattedMessage id={trekPopupResult.button.label} />
                    </span>
                  </Button>
                ) : (
                  <Link
                    className="mt-4 flex gap-1 items-center py-2 px-4 h-12 border border-solid border-primary1 rounded-lg text-sm text-primary1 bg-white font-semibold transition transition-color hover:bg-primary2 focus:bg-primary2"
                    href={generateResultDetailsUrl(
                      id,
                      trekPopupResult.title,
                      getRoute(type ?? null),
                      parentId,
                    )}
                  >
                    <span className="text-center w-full">
                      <FormattedMessage id="search.map.seeResult" />
                    </span>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </Loader>
  );
};

export const Popup: React.FC<Props> = ({
  id,
  parentId,
  handleOpen,
  handleClose,
  type,
  content,
}) => {
  const [hideTooltip, setHideTooltip] = useState<boolean>(false);

  return (
    <>
      {!hideTooltip && (
        <StyledTooltip>
          <PopupContent type={type} id={id} showButton={false} content={content} />
        </StyledTooltip>
      )}
      <StyledPopup
        closeButton={false}
        onOpen={() => {
          setHideTooltip(true);
          handleOpen?.();
        }}
        onClose={() => {
          setHideTooltip(false);
          handleClose?.();
        }}
        offset={[0, -12]}
      >
        <PopupContent type={type} id={id} showButton={true} parentId={parentId} content={content} />
      </StyledPopup>
    </>
  );
};

const desktopWidth = 288;
const desktopImgHeight = 122;
const mobileWidth = 215;
const mobileImgHeight = 133;

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

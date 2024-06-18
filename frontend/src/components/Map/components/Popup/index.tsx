import { useState } from 'react';
import Image from 'next/image';
import { routes } from 'services/routes';
import { Popup as LeafletPopup, Tooltip as LeafletTooltip } from 'react-leaflet';
import { FormattedMessage } from 'react-intl';
import Loader from 'components/Loader';

import { Button } from 'components/Button';
import { generateResultDetailsUrl } from 'components/pages/search/utils';

import Link from 'components/Link';
import { PopupResult } from 'modules/trekResult/interface';
import { getGlobalConfig } from 'modules/utils/api.config';
import { ContentType } from 'modules/interface';
import { usePopupResult } from '../../hooks/usePopupResult';

interface Props {
  id: number | string;
  parentId?: number;
  handleOpen?: () => void;
  handleClose?: () => void;
  type: ContentType | null;
  content?: PopupResult;
}

interface PropsPC {
  showButton: boolean;
  id: number | string;
  type: ContentType | null;
  parentId?: number;
  content?: PopupResult;
}

const getRoute = (type: PropsPC['type']) => (type && routes[type]) ?? routes.TREK;

const PopupContent: React.FC<PropsPC> = ({ showButton, id, type, parentId, content }) => {
  let isLoading = false;
  let trekPopupResult = null;

  const popupResult = usePopupResult(id.toString(), true, type);

  if (!content && type) {
    isLoading = popupResult.isLoading;
    trekPopupResult = popupResult.trekPopupResult;
  } else {
    trekPopupResult = content;
  }

  return (
    <Loader className="absolute inset-0" loaded={!isLoading}>
      {trekPopupResult && (
        <div className="flex flex-col">
          <Image
            loading="lazy"
            className="h-40 w-auto desktop:h-30 object-cover"
            width={300}
            height={130}
            src={trekPopupResult.imgUrl || getGlobalConfig().fallbackImageUri}
            alt=""
          />
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
                {trekPopupResult.button?.onClick ? (
                  <Button className="mt-4 w-full" {...trekPopupResult.button}>
                    <span className="w-full">
                      <FormattedMessage id={trekPopupResult.button.label} />
                    </span>
                  </Button>
                ) : (
                  <Link
                    className="mt-4 flex gap-1 items-center py-2 px-4 h-12 border border-solid border-primary1 rounded-lg text-sm text-primary1 bg-white font-semibold transition-color hover:bg-primary2 focus:bg-primary2 group"
                    href={generateResultDetailsUrl(
                      id,
                      trekPopupResult.title,
                      getRoute(type ?? null),
                      parentId,
                    )}
                  >
                    <span className="m-auto text-primary1 group-hover:text-primary3 group-focus:text-primary3 transition-color">
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
        <LeafletTooltip className="!p-0 !border-0 !rounded-xl !overflow-hidden w-55 desktop:w-70 !whitespace-normal">
          <PopupContent type={type} id={id} showButton={false} content={content} />
        </LeafletTooltip>
      )}
      <LeafletPopup
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
      </LeafletPopup>
    </>
  );
};

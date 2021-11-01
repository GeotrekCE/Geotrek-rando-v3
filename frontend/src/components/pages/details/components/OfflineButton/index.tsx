import { WifiOff } from 'components/Icons/WifiOff';
import Loader from 'components/Loader';
import Popup from 'components/Popup';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Check } from 'components/Icons/Check';
import { Bin } from 'components/Icons/Bin';
import CacheManager from 'services/offline/CacheManager';
import { colorPalette } from 'stylesheet';
import { Details } from '../../../../../modules/details/interface';
import { OutdoorCourseDetails } from '../../../../../modules/outdoorCourse/interface';
import { OutdoorSite, OutdoorSiteDetails } from '../../../../../modules/outdoorSite/interface';
import { TouristicContentDetails } from '../../../../../modules/touristicContent/interface';
import { Button } from '../../../../Button/Button';

interface Props {
  details: Details | TouristicContentDetails | OutdoorSiteDetails | OutdoorCourseDetails;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE';
}

const OfflineButton: React.FC<Props> = ({ details, type }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInCache, setIsInCache] = useState<boolean | null>(null);

  useEffect(() => {
    fetchState();
  }, []);

  const fetchState = () => {
    const result = CacheManager.isInCache(String(details.id));

    setIsInCache(result);
  };

  const handleSave = async () => {
    setIsLoading(true);

    const scriptsUrl = Array.from(document.getElementsByTagName('script'))
      .map(e => e.src)
      .filter(src => src.includes('chunks/pages/trek') || src.includes('chunks/pages/service'));

    await CacheManager.storeItem({
      details: details as Details,
      type,
      url: [window.location.href, ...scriptsUrl],
    });

    fetchState();

    setIsLoading(false);
  };

  const handleRemove = async () => {
    setIsLoading(true);

    await CacheManager.eraseItem(String(details.id));

    fetchState();

    setIsLoading(false);
  };

  const getButton = (onClick: () => any) => {
    return (
      <Button
        onClick={onClick}
        style={{
          color: isInCache ? colorPalette.easyOK : undefined,
          borderColor: isInCache ? colorPalette.easyOK : undefined,
        }}
      >
        {isInCache ? (
          <FormattedMessage id={'offline.isInCache'} />
        ) : (
          <FormattedMessage id={'offline.download'} />
        )}
      </Button>
    );
  };

  return (
    <>
      {openDialog && (
        <Popup>
          {isLoading && (
            <div>
              <Loader /> <FormattedMessage id={'offline.downloadInProgress'} />
            </div>
          )}

          {!isLoading && (
            <>
              <div className={'font-bold mb-8'}>
                <FormattedMessage id={'offline.title'} />
              </div>

              <div>
                {isInCache ? (
                  <FormattedMessage id={'offline.explainAvailable'} />
                ) : (
                  <FormattedMessage id={'offline.explain'} />
                )}
              </div>

              <div className={'flex justify-between mt-8'}>
                <Button onClick={() => setOpenDialog(false)}>
                  <FormattedMessage id={'actions.close'} />
                </Button>
                {isInCache ? (
                  <Button
                    onClick={handleRemove}
                    icon={Bin}
                    style={{
                      color: colorPalette.hardKO,
                      borderColor: colorPalette.hardKO,
                    }}
                  >
                    <FormattedMessage id={'actions.remove'} />
                  </Button>
                ) : (
                  getButton(handleSave)
                )}
              </div>
            </>
          )}
        </Popup>
      )}

      <div
        onClick={() => setOpenDialog(true)}
        className={`${
          isInCache ? 'bg-green-100' : 'bg-gray-100'
        } border border-solid border-gray-500 p-4 flex items-center rounded`}
      >
        <div className="w-8">{isInCache ? <Check /> : <WifiOff />}</div>
        <div className="ml-6">
          {isInCache ? (
            <FormattedMessage id={'offline.isInCache'} />
          ) : (
            <FormattedMessage id={'offline.explain'} />
          )}
        </div>
      </div>
    </>
  );
};

export default OfflineButton;

import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { WifiOff } from 'components/Icons/WifiOff';
import Loader from 'components/Loader';
import Popup from 'components/Popup';
import { Check } from 'components/Icons/Check';
import { Bin } from 'components/Icons/Bin';
import { Button } from 'components/Button';

import CacheManager from 'services/offline/CacheManager';
import { cn } from 'services/utils/cn';
import { Download } from 'components/Icons/Download';
import { Details } from 'modules/details/interface';
import { OutdoorCourseDetails } from 'modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { TouristicEventDetails } from 'modules/touristicEvent/interface';
import { ContentType } from 'modules/interface';

interface Props {
  details:
    | Details
    | TouristicContentDetails
    | OutdoorSiteDetails
    | OutdoorCourseDetails
    | TouristicEventDetails;
  type: ContentType;
}

const OfflineButton: React.FC<Props> = ({ details, type }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInCache, setIsInCache] = useState<boolean>(false);

  const fetchState = useCallback(() => {
    const result = CacheManager.isInCache(String(details.id));
    setIsInCache(result);
  }, [details.id]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const handleSave = async (): Promise<void> => {
    setIsLoading(true);

    const scriptsUrl = Array.from(document.getElementsByTagName('script'))
      .map(({ src }) => src)
      .filter(
        src =>
          src.includes('chunks/pages/trek') ||
          src.includes('chunks/pages/service') ||
          src.includes('chunks/pages/outdoor-site') ||
          src.includes('chunks/pages/outdoor-course'),
      );

    await CacheManager.storeItem({
      details: details as Details,
      type,
      url: [window.location.href, ...scriptsUrl],
    });

    fetchState();

    setIsLoading(false);
  };

  const handleRemove = async (): Promise<void> => {
    setIsLoading(true);

    await CacheManager.eraseItem(String(details.id));

    fetchState();

    setIsLoading(false);
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
                <Button
                  onClick={() => (isInCache ? void handleRemove() : void handleSave())}
                  icon={isInCache ? Bin : Download}
                  className={cn(
                    isInCache ? 'text-hardKO border-hardKO' : 'text-easyOK border-easyOK',
                  )}
                >
                  {isInCache ? (
                    <FormattedMessage id="actions.remove" />
                  ) : (
                    <FormattedMessage id="offline.download" />
                  )}
                </Button>
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

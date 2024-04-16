import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from 'components/Button';
import { Bin } from 'components/Icons/Bin';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import { generateDetailsUrlFromType } from 'components/pages/details/utils';
import CacheManager from 'services/offline/CacheManager';
import { PageHead } from 'components/PageHead';
import { Offline } from '../../modules/offline/interface';

const OfflinePage: NextPage = () => {
  const [results, setResults] = useState<Offline[]>([]);

  const intl = useIntl();

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = () => {
    const resultsInCache = CacheManager.getTreksCached();
    setResults(resultsInCache);
  };

  const handleErase = async (id: string): Promise<void> => {
    if (confirm(intl.formatMessage({ id: 'actions.confirmRemove' }))) {
      await CacheManager.eraseItem(id);
      void fetchData();
    }
  };

  return (
    <div className={'p-4'}>
      <PageHead>
        <meta name="robots" content="noindex,nofollow" />
      </PageHead>
      <div className={'font-bold text-xl'}>
        <FormattedMessage id={'offline.number'} values={{ count: results.length }} />
      </div>
      <FormattedMessage id={'offline.presentation'} />

      {results.map(result => {
        // Keep `thumbnailUris` and `attachments` for backward compatibily with old caches
        const images =
          (result.images || result.attachments) ??
          result.thumbnailUris.map(url => ({ url, legend: '', author: '' }));
        return (
          <div className={'relative'} key={`${result.type}-${result.id}`}>
            <ResultCard
              type={result.type}
              id={String(result.id)}
              place={String(result.place)}
              title={result.title}
              images={images}
              badgeIconUri={result.practice?.pictogramUri}
              hoverId={String(result.id)}
              informations={[
                {
                  label: 'difficulty',
                  value: result.informations.difficulty?.label ?? '',
                  pictogramUri: result.informations.difficulty?.pictogramUri ?? '',
                },
                {
                  label: 'duration',
                  value: result.informations.duration ?? '',
                },
                {
                  label: 'distance',
                  value: result.informations.distance ?? '',
                },
                {
                  label: 'positiveElevation',
                  value: result.informations.elevation ?? '',
                },
              ].filter(item => item.value.length > 0)}
              redirectionUrl={generateDetailsUrlFromType(result.type, result.id, result.title)}
              className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
            />
            <div className={'absolute top-2 right-2'}>
              <Button onClick={() => void handleErase(String(result.id))} icon={Bin}>
                <FormattedMessage id={'actions.remove'} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OfflinePage;

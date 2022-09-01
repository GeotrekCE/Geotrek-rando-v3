import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from 'components/Button';
import { Bin } from 'components/Icons/Bin';
import { Layout } from 'components/Layout/Layout';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import { generateResultDetailsUrl } from 'components/pages/search/utils';
import {
  generateOutdoorCourseUrl,
  generateOutdoorSiteUrl,
  generateTouristicContentUrl,
  generateTouristicEventUrl,
} from 'components/pages/details/utils';
import CacheManager from 'services/offline/CacheManager';
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

      return fetchData();
    }
  };

  return (
    <Layout>
      <div className={'p-4'}>
        <div className={'font-bold text-xl'}>
          <FormattedMessage id={'offline.number'} values={{ count: results.length }} />
        </div>
        <FormattedMessage id={'offline.presentation'} />

        {results.map(result => (
          <div className={'relative'} key={result.title}>
            {result.type === 'TREK' && (
              <ResultCard
                type={'TREK'}
                id={String(result.id)}
                place={String(result.place)}
                title={result.title}
                tags={[]}
                thumbnailUris={result.thumbnailUris}
                badgeIconUri={result.practice?.pictogram}
                hoverId={String(result.id)}
                informations={{
                  duration: String(result.informations.duration),
                  distance: String(result.informations.distance),
                  elevation: String(result.informations.elevation),
                  difficulty: result.informations.difficulty,
                  reservationSystem: null,
                }}
                redirectionUrl={generateResultDetailsUrl(result.id, result.title)}
                className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
              />
            )}
            {result.type === 'TOURISTIC_CONTENT' && (
              <ResultCard
                type={'TOURISTIC_CONTENT'}
                id={String(result.id)}
                place={String(result.place)}
                title={result.title}
                tags={[]}
                thumbnailUris={result.thumbnailUris}
                badgeIconUri={result.practice?.pictogram}
                hoverId={String(result.id)}
                informations={[]}
                redirectionUrl={generateTouristicContentUrl(result.id, result.title)}
                className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
              />
            )}
            {result.type === 'OUTDOOR_SITE' && (
              <ResultCard
                type={'OUTDOOR_SITE'}
                id={String(result.id)}
                place={String(result.place)}
                title={result.title}
                tags={[]}
                thumbnailUris={result.thumbnailUris}
                badgeIconUri={result.practice?.pictogram}
                hoverId={String(result.id)}
                informations={[]}
                redirectionUrl={generateOutdoorSiteUrl(result.id, result.title)}
                className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
              />
            )}
            {result.type === 'OUTDOOR_COURSE' && (
              <ResultCard
                type={'OUTDOOR_COURSE'}
                id={String(result.id)}
                place={String(result.place)}
                title={result.title}
                tags={[]}
                thumbnailUris={result.thumbnailUris}
                badgeIconUri={result.practice?.pictogram}
                hoverId={String(result.id)}
                informations={{
                  duration: '',
                  elevation: '',
                  height: '',
                  length: '',
                }}
                redirectionUrl={generateOutdoorCourseUrl(result.id, result.title)}
                className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
              />
            )}
            {result.type === 'TOURISTIC_EVENT' && (
              <ResultCard
                type={'TOURISTIC_EVENT'}
                id={String(result.id)}
                place={String(result.place)}
                title={result.title}
                tags={[]}
                thumbnailUris={result.thumbnailUris}
                badgeIconUri={result.practice?.pictogram}
                hoverId={String(result.id)}
                informations={{
                  duration: '',
                  elevation: '',
                  height: '',
                  length: '',
                }}
                redirectionUrl={generateTouristicEventUrl(result.id, result.title)}
                className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
              />
            )}

            <div className={'absolute top-2 right-2'}>
              <Button onClick={() => handleErase(String(result.id))} icon={Bin}>
                <FormattedMessage id={'actions.remove'} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default OfflinePage;

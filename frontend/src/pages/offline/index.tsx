import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from 'components/Button';
import { Bin } from 'components/Icons/Bin';
import { Layout } from 'components/Layout/Layout';
import { ResultCard } from 'components/pages/search/components/ResultCard';
import { generateResultDetailsUrl, getHoverId } from 'components/pages/search/utils';
import CacheManager from 'services/offline/CacheManager';

const Offline: NextPage = () => {
  const [results, setResults] = useState<any[]>([]);

  const intl = useIntl();

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = () => {
    const resultsInCache = CacheManager.getTreksCached();
    setResults(resultsInCache);
  };

  const handleErase = async (id: string) => {
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
            <ResultCard
              type={result.type}
              id={result.id}
              hoverId={getHoverId(result)}
              place={result.place}
              title={result.title}
              tags={[]}
              thumbnailUris={result.thumbnailUris}
              attachments={result.attachments}
              badgeIconUri={result.practice?.pictogram}
              informations={result.informations}
              redirectionUrl={generateResultDetailsUrl(result.id, result.title)}
              className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
            />

            <div className={'absolute top-2 right-2'}>
              <Button onClick={() => handleErase(result.id)} icon={Bin}>
                <FormattedMessage id={'actions.remove'} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Offline;

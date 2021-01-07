import React from 'react';

import { Walking } from 'components/Icons/Walking';

import { Layout } from 'components/Layout/Layout';
import { FilterBar } from './components/FilterBar';
import { ResultCard } from './components/ResultCard';
import { SearchResultsMeta } from './components/SearchResultsMeta';

export const SearchUI: React.FC = () => {
  return (
    <Layout>
      <FilterBar />
      <div className="p-4">
        <SearchResultsMeta resultsNumber={82} placeName="Val de Gaudemart" placeUrl="/" />
        <ResultCard
          activityIcon={Walking}
          place="Saint-Etienne-du-Valdonnez"
          title="Balade au pays des menhirs"
          tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
          informations={{
            duration: '2h',
            distance: '5km',
            elevation: '+360m',
            difficulty: 'Facile',
          }}
        />
        <ResultCard
          activityIcon={Walking}
          place="Saint-Etienne-du-Valdonnez"
          title="Balade au pays des menhirs"
          tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
          informations={{
            duration: '2h',
            distance: '5km',
            elevation: '+360m',
            difficulty: 'Facile',
          }}
        />
        <ResultCard
          activityIcon={Walking}
          place="Saint-Etienne-du-Valdonnez"
          title="Balade au pays des menhirs"
          tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
          informations={{
            duration: '2h',
            distance: '5km',
            elevation: '+360m',
            difficulty: 'Facile',
          }}
        />
      </div>
    </Layout>
  );
};

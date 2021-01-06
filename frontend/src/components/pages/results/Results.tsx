import React from 'react';

import { Walking } from 'components/Icons/Walking';

import { Layout } from 'components/Layout/Layout';
import { FilterBar } from './components/FilterBar';
import { ResultCard } from './components/ResultCard';

export const ResultsUI: React.FC = () => {
  return (
    <Layout>
      <FilterBar />
      <ResultCard
        activityIcon={Walking}
        place="Saint-Etienne-du-Valdonnez"
        title="Balade au pays des menhirs"
        tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
        informations={{ duration: '2h', distance: '5km', elevation: '+360m', difficulty: 'Facile' }}
      />
      <ResultCard
        activityIcon={Walking}
        place="Saint-Etienne-du-Valdonnez"
        title="Balade au pays des menhirs"
        tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
        informations={{ duration: '2h', distance: '5km', elevation: '+360m', difficulty: 'Facile' }}
      />
      <ResultCard
        activityIcon={Walking}
        place="Saint-Etienne-du-Valdonnez"
        title="Balade au pays des menhirs"
        tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
        informations={{ duration: '2h', distance: '5km', elevation: '+360m', difficulty: 'Facile' }}
      />
    </Layout>
  );
};

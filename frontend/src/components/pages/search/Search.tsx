import React from 'react';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

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

        <Separator className="w-full mt-6 desktop:block hidden" />

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

const Separator = styled.hr`
  background-color: ${colorPalette.greySoft};
  height: 1px;
  border: 0;
`;

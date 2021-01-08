import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { colorPalette, getSpacing, typography } from 'stylesheet';

import { Walking } from 'components/Icons/Walking';
import { Layout } from 'components/Layout/Layout';
import { OpenMapButton } from 'components/OpenMapButton';
import { MobileFilterMenu, useOpenFilterMenu } from 'components/MobileFilterMenu';

import { FilterBar } from './components/FilterBar';
import { ResultCard } from './components/ResultCard';
import { SearchResultsMeta } from './components/SearchResultsMeta';
import { ToggleFilterButton } from './components/ToggleFilterButton';

export const SearchUI: React.FC = () => {
  const { menuState, displayMenu } = useOpenFilterMenu();

  return (
    <Layout>
      <MobileFilterMenu menuState={menuState} />
      <FilterBar />
      <div className="p-4">
        <div className="flex justify-between items-end">
          <SearchResultsMeta resultsNumber={82} placeName="Val de Gaudemart" placeUrl="/" />
          <ToggleFilterButton onClick={displayMenu} />
        </div>
        <RankingInfo className="desktop:hidden">
          <FormattedMessage id="search.orderedByRelevance" />
        </RankingInfo>

        <Separator className="w-full mt-6 desktop:block hidden" />

        <OpenMapButton />

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

const RankingInfo = styled.div`
  ${typography.small}
  margin-top: ${getSpacing(1)};
`;

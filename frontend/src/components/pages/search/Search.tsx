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
import { useFilter } from './components/useFilters';
import { useSearchPage } from './useSearchPage';

export const SearchUI: React.FC = () => {
  const { menuState, displayMenu, hideMenu } = useOpenFilterMenu();
  const filtersList = [
    'Lieu',
    'Activité',
    'Difficulté',
    'Durée',
    'Distance',
    'Dénivelé',
    'Thème patrimonial',
    'Type de parcours',
    'Accessibilité',
    'Réservation',
    'Thèmes',
    'Communes',
    'Massif/Vallée',
    'Destination',
  ];
  const { filtersState } = useFilter();

  const { searchResults, isLoading } = useSearchPage();

  return (
    <>
      <MobileFilterMenu
        menuState={menuState}
        handleClose={hideMenu}
        title={<FormattedMessage id="search.filter" />}
        filtersList={filtersList}
        closeMenu={hideMenu}
      />
      <Layout>
        <FilterBar
          availableFilters={availableFilters}
          setFilterValues={setFilterValues}
          selectedFilters={selectedFilters}
        />
        <div className="p-4 desktop:pt-filterBar desktop:mt-6">
          <div className="flex justify-between items-end">
            <SearchResultsMeta resultsNumber={82} placeName="Val de Gaudemart" placeUrl="/" />
            <ToggleFilterButton onClick={displayMenu} />
          </div>
          <RankingInfo className="desktop:hidden">
            <FormattedMessage id="search.orderedByRelevance" />
          </RankingInfo>

          <Separator className="w-full mt-6 desktop:block hidden" />

          <OpenMapButton />

          {isLoading
            ? 'LOADING'
            : searchResults?.results.map(searchResult => (
                <ResultCard
                  key={searchResult.title}
                  activityIcon={Walking}
                  place={searchResult.place}
                  title={searchResult.title}
                  tags={searchResult.tags}
                  informations={searchResult.informations}
                />
              ))}
        </div>
      </Layout>
    </>
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

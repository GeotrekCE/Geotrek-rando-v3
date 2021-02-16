import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Loader from 'react-loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { colorPalette, getSpacing, sizes, typography, zIndex } from 'stylesheet';

import { Layout } from 'components/Layout/Layout';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { OpenMapButton } from 'components/OpenMapButton';
import {
  MobileFilterMenu,
  MobileFilterSubMenu,
  useFilterMenu,
  useFilterSubMenu,
} from 'components/MobileFilterMenu';

import { FilterState } from 'modules/filters/interface';
import { SearchMapDynamicComponent } from 'components/Map';
import { FilterBar } from './components/FilterBar';
import { ResultCard } from './components/ResultCard';
import { SearchResultsMeta } from './components/SearchResultsMeta';
import { ToggleFilterButton } from './components/ToggleFilterButton';
import { useFilter } from './components/useFilters';
import { useTrekResults } from './hooks/useTrekResults';
import { useMapResults } from './hooks/useMapResults';
import { ErrorFallback } from './components/ErrorFallback';
import { generateResultDetailsUrl } from './utils';

interface Props {
  initialFiltersState: FilterState[];
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
  initialFiltersStateWithSelectedOptions: FilterState[];
}

export const SearchUI: React.FC<Props> = ({
  initialFiltersState,
  touristicContentCategoryMapping,
  initialFiltersStateWithSelectedOptions,
}) => {
  const {
    filtersState,
    setFilterSelectedOptions,
    filterBarExpansionState,
    setFilterBarExpansionState,
    resetFilters,
  } = useFilter(
    initialFiltersState,
    touristicContentCategoryMapping,
    initialFiltersStateWithSelectedOptions,
  );

  const {
    subMenuState,
    selectFilter,
    hideSubMenu,
    currentFilterId,
    currentFilterState,
    selectOption,
    deSelectOption,
  } = useFilterSubMenu(filtersState, setFilterSelectedOptions);

  const { menuState, displayMenu, hideMenu, filtersList, activeFiltersNumber } = useFilterMenu(
    filtersState,
    selectFilter,
  );

  const {
    searchResults,
    isLoading,
    isError,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
  } = useTrekResults(filtersState);

  const { mapResults, isMapLoading } = useMapResults(filtersState);

  return (
    <>
      <MobileFilterMenu
        menuState={menuState}
        handleClose={hideMenu}
        title={<FormattedMessage id="search.filter" />}
        filtersList={filtersList}
        closeMenu={hideMenu}
        resetFilter={resetFilters}
      />
      <MobileFilterSubMenu
        menuState={subMenuState}
        handleClose={hideSubMenu}
        filterId={currentFilterId}
        closeMenu={hideSubMenu}
        filterState={currentFilterState}
        selectOption={selectOption}
        deSelectOption={deSelectOption}
      />
      <Layout>
        <Container className="flex flex-col">
          <FilterBar
            filtersState={filtersState}
            setFilterSelectedOptions={setFilterSelectedOptions}
            filterBarExpansionState={filterBarExpansionState}
            setFilterBarExpansionState={setFilterBarExpansionState}
            resetFilters={resetFilters}
          />
          <div className="flex flex-row flex-1 overflow-y-hidden">
            <div
              id="scrollableComponent"
              className="flex flex-col w-full desktop:w-1/2 overflow-y-scroll"
            >
              <div className="p-4 flex-1">
                <Loader
                  loaded={!isLoading}
                  options={{
                    top: `${sizes.desktopHeader + sizes.filterBar}px`,
                    color: colorPalette.primary1,
                    zIndex: zIndex.loader,
                  }}
                >
                  <div className="flex justify-between items-end">
                    <SearchResultsMeta resultsNumber={searchResults?.resultsNumber ?? 0} />
                    <ToggleFilterButton
                      onClick={displayMenu}
                      activeFiltersNumber={activeFiltersNumber}
                    />
                  </div>

                  <Separator className="w-full mt-6 desktop:block hidden" />

                  <OpenMapButton displayMap={displayMobileMap} />

                  <InfiniteScroll
                    dataLength={searchResults?.results.length ?? 0}
                    next={fetchNextPage}
                    hasMore={hasNextPage ?? false}
                    loader={
                      <div className={`relative my-10 ${isFetchingNextPage ? 'h-10' : ''}`}>
                        <Loader
                          loaded={!isFetchingNextPage}
                          options={{
                            color: colorPalette.primary1,
                            zIndex: zIndex.loader,
                          }}
                        ></Loader>
                      </div>
                    }
                    scrollableTarget="scrollableComponent"
                  >
                    {searchResults?.results.map(searchResult =>
                      searchResult.type === 'TREK' ? (
                        <ResultCard
                          type={searchResult.type}
                          key={searchResult.title}
                          id={`${searchResult.id}`}
                          place={searchResult.place}
                          title={searchResult.title}
                          tags={searchResult.tags}
                          thumbnailUris={searchResult.thumbnailUris}
                          badgeIconUri={searchResult.practice.pictogram}
                          informations={searchResult.informations}
                          redirectionUrl={generateResultDetailsUrl(
                            searchResult.id,
                            searchResult.title,
                          )}
                          className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
                        />
                      ) : (
                        <ResultCard
                          type={searchResult.type}
                          key={searchResult.name}
                          id={searchResult.id}
                          place={searchResult.place}
                          title={searchResult.name}
                          tags={searchResult.themes}
                          thumbnailUris={searchResult.thumbnailUris}
                          badgeIconUri={searchResult.category.pictogramUri}
                          informations={searchResult.types}
                          redirectionUrl={''}
                          className="my-4 desktop:my-6 desktop:mx-1 desktop:max-h-50" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                        />
                      ),
                    )}
                  </InfiniteScroll>
                  {isError && (
                    <ErrorFallback refetch={searchResults === null ? refetch : fetchNextPage} />
                  )}
                </Loader>
              </div>
            </div>

            <div className="hidden desktop:flex desktop:z-content desktop:w-1/2 desktop:fixed desktop:right-0 desktop:bottom-0 desktop:top-headerAndFilterBar">
              {isMapLoading && (
                <div
                  className="absolute bg-primary2 opacity-40 w-full h-full"
                  style={{ zIndex: 2000 }}
                />
              )}
              <Loader
                loaded={!isMapLoading}
                options={{
                  color: colorPalette.primary1,
                  zIndex: 2500,
                  scale: 2,
                }}
              />
              <SearchMapDynamicComponent
                points={mapResults}
                type="DESKTOP"
                shouldUseClusters
                shouldUsePopups
              />
            </div>
          </div>
        </Container>
      </Layout>
      <MobileMapContainer
        className={`desktop:hidden fixed right-0 left-0 h-full z-map ${
          mobileMapState === 'HIDDEN' ? 'hidden' : 'flex'
        }`}
        displayState={mobileMapState}
      >
        <SearchMapDynamicComponent
          hideMap={hideMobileMap}
          type="MOBILE"
          points={mapResults}
          openFilterMenu={displayMenu}
          hasFilters={activeFiltersNumber > 0}
          shouldUseClusters
          shouldUsePopups
        />
      </MobileMapContainer>
    </>
  );
};

const Container = styled.div`
  height: calc(100vh - ${sizes.desktopHeader}px);
`;

const Separator = styled.hr`
  background-color: ${colorPalette.greySoft};
  height: 1px;
  border: 0;
`;

const RankingInfo = styled.div`
  ${typography.small}
  margin-top: ${getSpacing(1)};
`;

export const MobileMapContainer = styled.div<{ displayState: 'DISPLAYED' | 'HIDDEN' }>`
  transition: top 0.3s ease-in-out 0.1s;
  top: ${({ displayState }) => (displayState === 'DISPLAYED' ? 0 : 100)}%;
`;

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Loader from 'react-loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { colorPalette, getSpacing, sizes, typography, zIndex } from 'stylesheet';

import { Layout } from 'components/Layout/Layout';
import { OpenMapButton } from 'components/OpenMapButton';
import {
  MobileFilterMenu,
  MobileFilterSubMenu,
  useFilterMenu,
  useFilterSubMenu,
} from 'components/MobileFilterMenu';

import { MapDynamicComponent } from 'components/Map';
import { FilterBar } from './components/FilterBar';
import { ResultCard } from './components/ResultCard';
import { SearchResultsMeta } from './components/SearchResultsMeta';
import { ToggleFilterButton } from './components/ToggleFilterButton';
import { useFilter } from './components/useFilters';
import { useSearchPage } from './useSearchPage';
import { ErrorFallback } from './components/ErrorFallback';

export const SearchUI: React.FC = () => {
  const { filtersState, setFilterSelectedOptions } = useFilter();

  const {
    subMenuState,
    selectFilter,
    hideSubMenu,
    currentFilterId,
    currentFilterState,
    selectOption,
    deSelectOption,
  } = useFilterSubMenu(filtersState, setFilterSelectedOptions);

  const { menuState, displayMenu, hideMenu, filtersList } = useFilterMenu(
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
  } = useSearchPage(filtersState);

  return (
    <>
      <MobileFilterMenu
        menuState={menuState}
        handleClose={hideMenu}
        title={<FormattedMessage id="search.filter" />}
        filtersList={filtersList}
        closeMenu={hideMenu}
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
        <FilterBar
          filtersState={filtersState}
          setFilterSelectedOptions={setFilterSelectedOptions}
        />
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <div className="p-4 desktop:pt-filterBar desktop:mt-6 relative flex-1">
              <Loader
                loaded={!isLoading}
                options={{
                  top: `${sizes.desktopHeader + sizes.filterBar}px`,
                  color: colorPalette.primary1,
                  zIndex: zIndex.loader,
                }}
              >
                <div className="flex justify-between items-end">
                  <SearchResultsMeta
                    resultsNumber={searchResults?.resultsNumber}
                    placeName="Val de Gaudemart"
                    placeUrl="/"
                  />
                  <ToggleFilterButton onClick={displayMenu} />
                </div>
                <RankingInfo className="desktop:hidden">
                  <FormattedMessage id="search.orderedByRelevance" />
                </RankingInfo>

                <Separator className="w-full mt-6 desktop:block hidden" />

                <OpenMapButton />

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
                >
                  {searchResults?.results.map(searchResult => (
                    <ResultCard
                      key={searchResult.title}
                      id={searchResult.id}
                      place={searchResult.place}
                      title={searchResult.title}
                      tags={searchResult.tags}
                      thumbnailUri={searchResult.thumbnailUri}
                      badgeIconUri={searchResult.practice.pictogram}
                      informations={searchResult.informations}
                    />
                  ))}
                </InfiniteScroll>
                {isError && (
                  <ErrorFallback refetch={searchResults === null ? refetch : fetchNextPage} />
                )}
              </Loader>
            </div>
          </div>
          <div className="w-1/2 z-content mt-filterBar fixed h-full right-0">
            <MapDynamicComponent />
          </div>
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

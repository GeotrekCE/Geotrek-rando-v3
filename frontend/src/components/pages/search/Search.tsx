import FilterBarNew from 'components/pages/search/components/FilterBar';
import useBbox from 'components/pages/search/components/useBbox';
import React from 'react';
import { useMediaPredicate } from 'react-media-hook';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'react-loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { colorPalette, sizes, zIndex } from 'stylesheet';

import { Layout } from 'components/Layout/Layout';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { OpenMapButton } from 'components/OpenMapButton';
import {
  MobileFilterMenu,
  MobileFilterSubMenu,
  useFilterMenu,
  useFilterSubMenu,
} from 'components/MobileFilterMenu';

import { PageHead } from 'components/PageHead';
import { FilterState } from 'modules/filters/interface';
import { SearchMapDynamicComponent } from 'components/Map';
import { countFiltersSelected } from '../../../modules/filters/utils';
import { OutdoorSite } from '../../../modules/outdoorSite/interface';
import { TrekResult } from '../../../modules/results/interface';
import { TouristicContentResult } from '../../../modules/touristicContent/interface';
import { TouristicEvent } from '../../../modules/touristicEvent/interface';
import { ResultCard } from './components/ResultCard';
import { SearchResultsMeta } from './components/SearchResultsMeta';
import { ToggleFilterButton } from './components/ToggleFilterButton';
import { useFilter } from './components/useFilters';
import { useTrekResults } from './hooks/useTrekResults';
import { useMapResults } from './hooks/useMapResults';
import { ErrorFallback } from './components/ErrorFallback';
import { generateResultDetailsUrl, getHoverId } from './utils';
import {
  generateOutdoorSiteUrl,
  generateTouristicContentUrl,
  generateTouristicEventUrl,
} from '../details/utils';
import InputWithMagnifier from './components/InputWithMagnifier';
import { useTextFilter } from './hooks/useTextFilter';
import { useDateFilter } from './hooks/useDateFilter';

interface Props {
  initialFiltersState: FilterState[];
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
  initialFiltersStateWithSelectedOptions: FilterState[];
  language: string;
}

export const SearchUI: React.FC<Props> = ({ language }) => {
  const { filtersState, setFilterSelectedOptions, resetFilters } = useFilter();

  const { subMenuState, selectFilter, hideSubMenu, currentFilterId } = useFilterSubMenu();
  const { menuState, displayMenu, hideMenu, filtersList } = useFilterMenu(selectFilter);

  const { bboxState, handleMoveMap } = useBbox();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  const {
    textFilterInput,
    textFilterState,
    onTextFilterInputChange,
    onTextFilterSubmit,
    resetTextFilter,
  } = useTextFilter();

  const { dateFilter, setDateFilter } = useDateFilter();

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
  } = useTrekResults({ filtersState, textFilterState, bboxState, dateFilter }, language);

  const { isMapLoading } = useMapResults({ filtersState, textFilterState, dateFilter }, language);

  const intl = useIntl();

  const onRemoveAllFiltersClick = () => {
    resetFilters();
    resetTextFilter();
  };

  const filtersStateWithExclude = filtersState.reduce((list, item) => {
    const [id, exclude] = item.id.split('_');
    if (exclude !== undefined) {
      const index = list?.findIndex(filter => filter?.id === id) ?? -1;
      if (index > -1) {
        list[index] = {
          ...item,
          id,
          selectedOptions: [
            ...list[index].selectedOptions,
            ...item.selectedOptions.map(option => ({ ...option, include: false })),
          ],
        };
      }
    } else {
      list.push({
        ...item,
        selectedOptions: item.selectedOptions.map(option => ({ ...option, include: true })),
      });
    }
    return list;
  }, [] as FilterState[]);

  const numberSelected = countFiltersSelected(filtersState, null, null);

  return (
    <div id="Search">
      <PageHead
        title={`${intl.formatMessage({ id: 'search.title' })}`}
        description={`${intl.formatMessage({ id: 'search.description' })}`}
      />

      {isMobile && (
        <>
          {menuState === 'DISPLAYED' && subMenuState !== 'DISPLAYED' && (
            <MobileFilterMenu
              handleClose={hideMenu}
              title={<FormattedMessage id="search.filter" />}
              filtersState={filtersStateWithExclude}
              filtersList={filtersList}
              resetFilter={onRemoveAllFiltersClick}
              resultsNumber={searchResults?.resultsNumber ?? 0}
              language={language}
            />
          )}
          {subMenuState === 'DISPLAYED' && (
            <MobileFilterSubMenu
              handleClose={hideSubMenu}
              filterId={currentFilterId}
              filtersState={filtersStateWithExclude}
              setFilterSelectedOptions={setFilterSelectedOptions}
              resetFilter={onRemoveAllFiltersClick}
              resultsNumber={searchResults?.resultsNumber ?? 0}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          )}
        </>
      )}

      <Layout>
        <Container className="flex flex-col" id="search_container">
          {!isMobile && (
            <FilterBarNew
              dateFilter={dateFilter}
              filtersState={filtersStateWithExclude}
              setFilterSelectedOptions={setFilterSelectedOptions}
              setDateFilter={setDateFilter}
              resetFilters={onRemoveAllFiltersClick}
              resultsNumber={searchResults?.resultsNumber ?? 0}
              language={language}
            />
          )}
          <div className="flex flex-row flex-1 overflow-y-hidden">
            <div
              id="search_resultCardList"
              className="flex flex-col w-full desktop:w-1/2 overflow-y-scroll"
            >
              <div className="p-4 flex-1">
                <Loader
                  loaded={!isLoading}
                  options={{
                    top: '40px',
                    color: colorPalette.primary1,
                    zIndex: zIndex.loader,
                    position: 'relative',
                  }}
                >
                  <div className="flex flex-col desktop:flex-row desktop:justify-between">
                    <div className="flex justify-between items-end" id="search_resultMapTitle">
                      <SearchResultsMeta resultsNumber={searchResults?.resultsNumber ?? 0} />
                      <ToggleFilterButton onClick={displayMenu} numberSelected={numberSelected} />
                    </div>
                    <div className="flex items-center mt-4 desktop:mt-0 desktop:ml-5">
                      <InputWithMagnifier
                        value={textFilterInput}
                        onChange={onTextFilterInputChange}
                        onButtonClick={onTextFilterSubmit}
                      />
                    </div>
                  </div>

                  <Separator className="w-full mt-6 desktop:block hidden" />

                  <OpenMapButton displayMap={displayMobileMap} />

                  <InfiniteScroll
                    dataLength={searchResults?.results.length ?? 0}
                    next={fetchNextPage}
                    hasMore={hasNextPage ?? false}
                    loader={
                      <div className={` my-10 ${isFetchingNextPage ? 'h-10' : ''}`}>
                        <Loader
                          loaded={!isFetchingNextPage}
                          options={{
                            color: colorPalette.primary1,
                            zIndex: zIndex.loader,
                          }}
                        ></Loader>
                      </div>
                    }
                    scrollableTarget="search_resultCardList"
                  >
                    {searchResults?.results.map(searchResult => {
                      if (isTrek(searchResult))
                        return (
                          <ResultCard
                            type={searchResult.type}
                            key={`trek-${searchResult.id}`}
                            id={`${searchResult.id}`}
                            hoverId={getHoverId(searchResult)}
                            place={searchResult.place}
                            title={searchResult.title}
                            tags={searchResult.tags}
                            thumbnailUris={searchResult.thumbnailUris}
                            attachments={searchResult.attachments}
                            badgeIconUri={searchResult.practice?.pictogram}
                            badgeName={searchResult.practice?.name}
                            informations={searchResult.informations}
                            redirectionUrl={generateResultDetailsUrl(
                              searchResult.id,
                              searchResult.title,
                            )}
                            className="my-4 desktop:my-6 desktop:mx-1" // Height is not limited to let the card grow with long text & informations. Most photos are not vertical, and does not have to be restrained.
                          />
                        );
                      else if (isTouristicContent(searchResult))
                        return (
                          <ResultCard
                            type={searchResult.type}
                            key={`touristicContent-${searchResult.id}`}
                            id={`${searchResult.id}`}
                            hoverId={getHoverId(searchResult)}
                            place={searchResult.place}
                            title={searchResult.name}
                            tags={searchResult.themes}
                            thumbnailUris={searchResult.thumbnailUris}
                            attachments={searchResult.attachments}
                            badgeIconUri={searchResult.category.pictogramUri}
                            badgeName={searchResult.category.label}
                            informations={searchResult.types}
                            redirectionUrl={generateTouristicContentUrl(
                              searchResult.id,
                              searchResult.name,
                            )}
                            className="my-4 desktop:my-6 desktop:mx-1 desktop:max-h-50" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                          />
                        );
                      else if (isOutdoorSite(searchResult))
                        return (
                          <ResultCard
                            type={searchResult.type}
                            key={`outdoor-${searchResult.id}`}
                            id={`${searchResult.id}`}
                            hoverId={getHoverId(searchResult)}
                            place={searchResult.place}
                            title={searchResult.name}
                            tags={searchResult.themes}
                            thumbnailUris={searchResult.thumbnailUris}
                            attachments={searchResult.attachments}
                            badgeIconUri={searchResult.practice?.pictogram}
                            badgeName={searchResult.practice?.name}
                            informations={[]}
                            redirectionUrl={generateOutdoorSiteUrl(
                              searchResult.id,
                              searchResult.name,
                            )}
                            className="my-4 desktop:my-6 desktop:mx-1 desktop:max-h-50" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                          />
                        );
                      else if (isTouristicEvent(searchResult))
                        return (
                          <ResultCard
                            type={searchResult.type}
                            key={`touristicEvent-${searchResult.id}`}
                            id={`${searchResult.id}`}
                            hoverId={getHoverId(searchResult)}
                            place={searchResult.place}
                            title={searchResult.name}
                            tags={searchResult.themes}
                            thumbnailUris={searchResult.thumbnailUris}
                            attachments={searchResult.attachments}
                            badgeIconUri={searchResult.typeEvent?.pictogram}
                            badgeName={searchResult.typeEvent?.type}
                            informations={{
                              date: {
                                beginDate: searchResult.beginDate,
                                endDate: searchResult.endDate,
                              },
                            }}
                            redirectionUrl={generateTouristicEventUrl(
                              searchResult.id,
                              searchResult.name,
                            )}
                            className="my-4 desktop:my-6 desktop:mx-1 desktop:max-h-50" // Height is limited in desktop to restrain vertical images ; not limiting with short text & informations
                          />
                        );
                    })}
                  </InfiniteScroll>
                  {isError && (
                    <ErrorFallback refetch={searchResults === null ? refetch : fetchNextPage} />
                  )}
                </Loader>
              </div>
            </div>

            <div
              className="hidden desktop:flex desktop:z-content desktop:w-1/2 desktop:fixed desktop:right-0 desktop:bottom-0 desktop:top-headerAndFilterBar"
              id="search_resultMap"
            >
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
              {!isMobile && (
                <SearchMapDynamicComponent
                  type="DESKTOP"
                  onMove={handleMoveMap}
                  shouldUseClusters
                  shouldUsePopups
                />
              )}
            </div>
          </div>
        </Container>
      </Layout>
      {isMobile && (
        <MobileMapContainer
          className={`desktop:hidden fixed right-0 left-0 h-full z-map ${
            mobileMapState === 'HIDDEN' ? 'hidden' : 'flex'
          }`}
          displayState={mobileMapState}
        >
          <SearchMapDynamicComponent
            hideMap={hideMobileMap}
            type="MOBILE"
            openFilterMenu={displayMenu}
            hasFilters={numberSelected > 0}
            shouldUseClusters
            shouldUsePopups
          />
        </MobileMapContainer>
      )}
    </div>
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

export const MobileMapContainer = styled.div<{ displayState: 'DISPLAYED' | 'HIDDEN' | null }>`
  transition: top 0.3s ease-in-out 0.1s;
  top: ${({ displayState }) => (displayState === 'DISPLAYED' ? 0 : 100)}%;
`;

export const isTrek = (
  content: TrekResult | TouristicContentResult | OutdoorSite | TouristicEvent,
): content is TrekResult => content.type === 'TREK';

export const isTouristicContent = (
  content: TrekResult | TouristicContentResult | OutdoorSite | TouristicEvent,
): content is TouristicContentResult => content.type === 'TOURISTIC_CONTENT';

export const isOutdoorSite = (
  content: TrekResult | TouristicContentResult | OutdoorSite | TouristicEvent,
): content is OutdoorSite => content.type === 'OUTDOOR_SITE';

export const isTouristicEvent = (
  content: TrekResult | TouristicContentResult | OutdoorSite | TouristicEvent,
): content is TouristicEvent => content.type === 'TOURISTIC_EVENT';

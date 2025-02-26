import FilterBarNew from 'components/pages/search/components/FilterBar';
import useBbox from 'components/pages/search/components/useBbox';
import { useEffect } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'components/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

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
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import { useRouter } from 'next/router';
import { cn } from 'services/utils/cn';
import { countFiltersSelected } from '../../../modules/filters/utils';
import { ResultCard } from './components/ResultCard';
import { SearchResultsMeta } from './components/SearchResultsMeta';
import { ToggleFilterButton } from './components/ToggleFilterButton';
import { useFilter } from './components/useFilters';
import { useTrekResults } from './hooks/useTrekResults';
import { useMapResults } from './hooks/useMapResults';
import { ErrorFallback } from './components/ErrorFallback';
import { getHoverId } from './utils';
import { generateDetailsUrlFromType } from '../details/utils';
import InputWithMagnifier from './components/InputWithMagnifier';
import { useTextFilter } from './hooks/useTextFilter';
import { useDateFilter } from './hooks/useDateFilter';
import { useTitle } from './hooks/useTitle';
import { Pagination } from './components/Pagination';

interface Props {
  language: string;
}

export const SearchUI: React.FC<Props> = ({ language }) => {
  const router = useRouter();
  const { filtersState, setFilterSelectedOptions, resetFilters } = useFilter();

  const { subMenuState, selectFilter, hideSubMenu, currentFilterId } = useFilterSubMenu();
  const { menuState, displayMenu, hideMenu, filtersList } = useFilterMenu(selectFilter);

  const { bounds, handleMoveMap } = useBbox();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  const page = Number(router.query.page ?? 1);

  const {
    textFilterInput,
    textFilterState,
    onTextFilterInputChange,
    onTextFilterSubmit,
    resetTextFilter,
  } = useTextFilter();

  const { dateFilter, setDateFilter } = useDateFilter();
  const { searchBbox, setPoints, setSearchBbox, isNavigatedByBrowser } = useListAndMapContext();

  const bboxState = bounds ?? (isNavigatedByBrowser ? searchBbox : null);

  const {
    searchResults,
    isLoading,
    isError,
    refetch,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
  } = useTrekResults(
    {
      filtersState,
      textFilterState,
      bboxState: bboxState?.toBBoxString() ?? null,
      dateFilter,
      page,
    },
    language,
  );

  const { pageTitle, resultsTitle } = useTitle(filtersState, searchResults?.resultsNumber);

  const { isMapLoading, mapResults } = useMapResults(
    { filtersState, textFilterState, dateFilter },
    language,
  );

  useEffect(() => {
    if (mapResults) {
      setPoints(mapResults);
    }
  }, [mapResults, setPoints]);

  useEffect(() => {
    if (bounds && !isNavigatedByBrowser) {
      setSearchBbox(bounds);
    }
  }, [bounds, isNavigatedByBrowser, setSearchBbox]);

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
            ...item.selectedOptions.map(option => ({
              ...option,
              include: false,
            })),
          ],
        };
      }
    } else {
      list.push({
        ...item,
        selectedOptions: item.selectedOptions.map(option => ({
          ...option,
          include: true,
        })),
      });
    }
    return list;
  }, [] as FilterState[]);

  const numberSelected = countFiltersSelected(filtersState, null, null);

  return (
    <div id="Search" className="h-full">
      <PageHead
        title={pageTitle}
        description={`${intl.formatMessage({ id: 'search.description' })}`}
      >
        {page > 1 && <meta name="robots" content="noindex,follow" />}
      </PageHead>

      {isMobile && (
        <MobileFilterSubMenu
          handleClose={hideSubMenu}
          isOpen={subMenuState !== 'HIDDEN'}
          filterId={currentFilterId}
          filtersState={filtersStateWithExclude}
          setFilterSelectedOptions={setFilterSelectedOptions}
          resetFilter={onRemoveAllFiltersClick}
          resultsNumber={searchResults?.resultsNumber ?? 0}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      )}

      <div className="flex flex-col" id="search_container">
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
        <div className="flex flex-row flex-1">
          <div id="search_resultCardList" className="flex flex-col w-full desktop:w-1/2">
            <div className="p-4 flex-1">
              <Loader loaded={!isLoading}>
                <div className="flex flex-col desktop:flex-row desktop:justify-between">
                  <div className="flex justify-between items-end" id="search_resultMapTitle">
                    <SearchResultsMeta textContent={resultsTitle} />
                    <MobileFilterMenu
                      title={<FormattedMessage id="search.filter" />}
                      filtersState={filtersStateWithExclude}
                      filtersList={filtersList}
                      resetFilter={onRemoveAllFiltersClick}
                      resultsNumber={searchResults?.resultsNumber ?? 0}
                      language={language}
                    >
                      <ToggleFilterButton
                        onClick={menuState === 'DISPLAYED' ? hideMenu : displayMenu}
                        numberSelected={numberSelected}
                      />
                    </MobileFilterMenu>
                  </div>
                  <div className="flex items-center mt-4 desktop:mt-0 desktop:ml-5">
                    <InputWithMagnifier
                      value={textFilterInput}
                      onChange={onTextFilterInputChange}
                      onSubmit={onTextFilterSubmit}
                    />
                  </div>
                </div>

                <hr className="w-full mt-6 h-0 border-0 desktop:block hidden" />

                <OpenMapButton displayMap={displayMobileMap} />

                <InfiniteScroll
                  dataLength={searchResults?.results.length ?? 0}
                  next={() => !isFetching && fetchNextPage()}
                  hasMore={Boolean(hasNextPage)}
                  loader={
                    <div className={`relative my-10 ${isFetchingNextPage ? 'h-10' : ''}`}>
                      <Loader loaded={!isFetchingNextPage} />
                    </div>
                  }
                  scrollableTarget="body"
                >
                  {searchResults?.results.map(searchResult => {
                    return (
                      <ResultCard
                        type={searchResult.type}
                        key={`${searchResult.type}-${searchResult.id}`}
                        id={`${searchResult.id}`}
                        hoverId={getHoverId(searchResult)}
                        place={searchResult.place}
                        title={searchResult.name}
                        tags={searchResult.tags}
                        images={searchResult.images}
                        badgeIconUri={searchResult.category?.pictogramUri}
                        badgeName={searchResult.category?.label}
                        informations={searchResult.informations ?? []}
                        redirectionUrl={generateDetailsUrlFromType(
                          searchResult.type,
                          searchResult.id,
                          searchResult.name,
                        )}
                        className="my-4 desktop:my-6 desktop:mx-1"
                        titleTag="h2"
                      />
                    );
                  })}
                </InfiniteScroll>

                {/* noscript: Visible only for SEO purpose */}
                <noscript>
                  <Pagination hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} />
                </noscript>

                {isError && (
                  <ErrorFallback refetch={searchResults === null ? refetch : fetchNextPage} />
                )}
              </Loader>
            </div>
          </div>

          <div
            id="search_resultMap"
            className={cn(
              'fixed inset-0 z-map left-full w-full transition-transform',
              'desktop:z-content desktop:left-auto desktop:w-1/2 desktop:top-headerAndFilterBar',
              mobileMapState === 'DISPLAYED'
                ? '-translate-x-full desktop:translate-x-0 h-auto'
                : 'translate-x-0 h-screen desktop:h-auto',
            )}
          >
            <Loader loaded={!isMapLoading} className="fixed inset-0 z-map" />
            {isMapLoading && <div className="fixed bg-primary2 opacity-40 inset-0 z-map" />}
            <SearchMapDynamicComponent
              hasZoomControl={!isMobile}
              onMove={handleMoveMap}
              hideMap={hideMobileMap}
              openFilterMenu={displayMenu}
              shouldUseClusters
              shouldUsePopups
            />
          </div>
        </div>
      </div>
    </div>
  );
};

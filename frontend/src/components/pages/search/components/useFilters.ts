import { getInitialFilters } from 'modules/filters/connector';
import { CATEGORY_ID, PRACTICE_ID } from 'modules/filters/constant';
import { FilterState, Option } from 'modules/filters/interface';
import {
  commonFilters,
  computeFiltersToDisplay,
  getNewLanguageFiltersState,
} from 'modules/filters/utils';
import { getDefaultLanguage } from 'modules/header/utills';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export const useFilter = () => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const initialOptions = useRouter().query;

  const { data } = useQuery<
    {
      initialFiltersState: FilterState[];
      touristicContentCategoryMapping: TouristicContentCategoryMapping;
      initialFiltersStateWithSelectedOptions: FilterState[];
    },
    Error
  >(['initialFilterState', language], () => getInitialFilters(language, initialOptions));

  const initialFiltersState = data ? data.initialFiltersState : [];
  const touristicContentCategoryMapping = data ? data.touristicContentCategoryMapping : {};
  const initialFiltersStateWithSelectedOptions = data
    ? data.initialFiltersStateWithSelectedOptions
    : [];

  const [filtersState, setFiltersState] = useState<FilterState[]>(
    initialFiltersStateWithSelectedOptions,
  );

  useEffect(() => {
    setFiltersState(initialFiltersStateWithSelectedOptions);
  }, [initialFiltersStateWithSelectedOptions.length]);

  useEffect(() => {
    setFiltersState(currentFiltersState =>
      getNewLanguageFiltersState(currentFiltersState, initialFiltersState),
    );
  }, [language]);

  const practices = initialFiltersStateWithSelectedOptions[0];
  const services = initialFiltersStateWithSelectedOptions[1];
  const isPracticeOrCategorySelected =
    initialFiltersStateWithSelectedOptions.length > 0 &&
    ((practices.selectedOptions.length > 0 && services.selectedOptions.length === 0) ||
      (practices.selectedOptions.length === 0 && services.selectedOptions.length === 1));

  const [filterBarExpansionState, setFilterBarExpansionState] = useState<'EXPANDED' | 'COLLAPSED'>(
    isPracticeOrCategorySelected ? 'EXPANDED' : 'COLLAPSED',
  );

  const expandFilterBarIfNecessary = (filterId: string, numberOfOptionsSelected: number) => {
    if (
      filterId === PRACTICE_ID &&
      numberOfOptionsSelected === 1 &&
      filtersState[0].selectedOptions.length === 0 &&
      filtersState[1].selectedOptions.length === 0 &&
      filterBarExpansionState === 'COLLAPSED'
    ) {
      setFilterBarExpansionState('EXPANDED');
    }
    if (
      filterId === CATEGORY_ID &&
      numberOfOptionsSelected === 1 &&
      filtersState[0].selectedOptions.length === 0 &&
      filterBarExpansionState === 'COLLAPSED'
    ) {
      setFilterBarExpansionState('EXPANDED');
    }
  };

  const setFilterSelectedOptions = (filterId: string, options: Option[]) => {
    expandFilterBarIfNecessary(filterId, options.length);
    setFiltersState(currentState => {
      const currentStateWithRelevantFilters = computeFiltersToDisplay({
        currentFiltersState: currentState,
        initialFiltersState,
        optionsSelected: options,
        selectedFilterId: filterId,
        touristicContentCategoryMapping,
      });
      return currentStateWithRelevantFilters.map(filterState => {
        if (filterState.id === filterId) {
          return {
            ...filterState,
            selectedOptions: options,
          };
        }
        return filterState;
      });
    });
  };

  const resetFilters = () => {
    setFiltersState(initialFiltersState.filter(({ id }) => commonFilters.includes(id)));
    setFilterBarExpansionState('COLLAPSED');
  };

  return {
    filtersState,
    setFilterSelectedOptions,
    filterBarExpansionState,
    setFilterBarExpansionState,
    resetFilters,
  };
};

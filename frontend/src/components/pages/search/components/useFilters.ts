import { getInitialFilters } from 'modules/filters/connector';
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
      getNewLanguageFiltersState(currentFiltersState, initialFiltersStateWithSelectedOptions),
    );
  }, [language]);

  const setFilterSelectedOptions = (filterId: string, options: Option[]) => {
    setFiltersState(currentState => {
      const newState = currentState.map(filterState => {
        if (filterState.id === filterId) {
          return {
            ...filterState,
            selectedOptions: options,
          };
        }
        return filterState;
      });

      return computeFiltersToDisplay({
        currentFiltersState: newState,
        initialFiltersState,
        selectedFilterId: filterId,
        touristicContentCategoryMapping,
      });
    });
  };

  const resetFilters = () => {
    setFiltersState(initialFiltersState.filter(({ id }) => commonFilters.includes(id)));
  };

  return {
    filtersState,
    setFilterSelectedOptions,
    resetFilters,
  };
};

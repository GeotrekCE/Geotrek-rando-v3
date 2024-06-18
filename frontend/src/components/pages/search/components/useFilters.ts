import { getInitialFilters } from 'modules/filters/connector';
import { FilterState, FilterWithoutType, Option } from 'modules/filters/interface';
import {
  commonFilters,
  computeFiltersToDisplay,
  getNewLanguageFiltersState,
} from 'modules/filters/utils';
import { getDefaultLanguage } from 'modules/header/utills';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { OutdoorPracticeChoices } from 'modules/outdoorPractice/interface';
import { OutdoorRatingMapping } from 'modules/outdoorRating/interface';
import { OutdoorRatingScale } from 'modules/outdoorRatingScale/interface';

export const useFilter = () => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const initialOptions = useRouter().query;

  const { data } = useQuery<
    {
      initialFiltersState: FilterState[];
      touristicContentCategoryMapping: TouristicContentCategoryMapping;
      outdoorRatingMapping: OutdoorRatingMapping;
      outdoorRatingScale: OutdoorRatingScale[];
      outdoorPractice: OutdoorPracticeChoices;
      initialFiltersStateWithSelectedOptions: FilterState[];
      organizerEvent: FilterWithoutType | null;
    },
    Error
  >(['initialFilterState', language], () => getInitialFilters(language, initialOptions));

  const initialFiltersState = data ? data.initialFiltersState : [];
  const touristicContentCategoryMapping = data ? data.touristicContentCategoryMapping : {};
  const organizerEvent = data?.organizerEvent ?? null;

  const outdoorRatingMapping = data ? data.outdoorRatingMapping : {};
  const outdoorRatingScale = data ? data.outdoorRatingScale : [];
  const outdoorPractice = data ? data.outdoorPractice : {};
  const initialFiltersStateWithSelectedOptions = useMemo(
    () => (data ? data.initialFiltersStateWithSelectedOptions : []),
    [data],
  );

  const [filtersState, setFiltersState] = useState<FilterState[]>(
    initialFiltersStateWithSelectedOptions,
  );

  useEffect(() => {
    setFiltersState(initialFiltersStateWithSelectedOptions);
  }, [initialFiltersStateWithSelectedOptions, initialFiltersStateWithSelectedOptions.length]);

  useEffect(() => {
    setFiltersState(currentFiltersState =>
      getNewLanguageFiltersState(currentFiltersState, initialFiltersStateWithSelectedOptions),
    );
  }, [initialFiltersStateWithSelectedOptions, language]);

  const setFilterSelectedOptions = (filterId: string, options: Option[]) => {
    setFiltersState(currentState => {
      const newState = currentState.map(filterState => {
        if (filterState.id === filterId) {
          return {
            ...filterState,
            selectedOptions: options.sort((a, b) =>
              a.value.localeCompare(b.value, undefined, { numeric: true }),
            ),
          };
        }
        return filterState;
      });

      return computeFiltersToDisplay({
        currentFiltersState: newState,
        initialFiltersState,
        selectedFilterId: filterId,
        touristicContentCategoryMapping,
        outdoorRatingMapping,
        outdoorRatingScale,
        outdoorPractice,
        organizerEvent,
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

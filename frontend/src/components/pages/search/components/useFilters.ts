import {
  BaseFilters,
  DisplayableAvailableFilters,
  DisplayableFilter,
  SelectedFilters,
  TrekFilters,
} from 'modules/filters/interface';
import { getAvailableFilters } from 'modules/filters/utils';
import { useReducer } from 'react';
import { useQuery } from 'react-query';
import { filterReducer, setFilterValuesAction } from './filterReducer';

export const useFilter = () => {
  const { data: availableFilters } = useQuery('filters', getAvailableFilters);

  const initialState: SelectedFilters = {
    [BaseFilters.ACTIVITIES]: [],
    [BaseFilters.CITY]: [],
    [BaseFilters.DISTRICT]: [],
    [BaseFilters.THEME]: [],
    [TrekFilters.DIFFICULTY]: [],
    [TrekFilters.COURSE_TYPE]: [],
    [TrekFilters.ACCESSIBILITY]: [],
    [TrekFilters.DURATION]: [],
    [TrekFilters.LENGTH]: [],
    [TrekFilters.POSITIVE_ELEVATION]: [],
  };

  const [selectedFilters, dispatch] = useReducer(filterReducer, initialState);

  const setFilterValues = (filter: BaseFilters | TrekFilters, values: DisplayableFilter[]) =>
    dispatch(setFilterValuesAction(filter, values));

  const displayableAvailableFilters: DisplayableAvailableFilters = {
    [BaseFilters.ACTIVITIES]: [],
    [BaseFilters.CITY]: [],
    [BaseFilters.DISTRICT]: [],
    [BaseFilters.THEME]: [],
    [TrekFilters.DIFFICULTY]: availableFilters
      ? Object.keys(availableFilters[TrekFilters.DIFFICULTY].choices).map(difficultyId => ({
          value: difficultyId,
          label: availableFilters[TrekFilters.DIFFICULTY].choices[difficultyId].label,
        }))
      : [],
    [TrekFilters.COURSE_TYPE]: [],
    [TrekFilters.ACCESSIBILITY]: [],
    [TrekFilters.DURATION]: [],
    [TrekFilters.LENGTH]: [],
    [TrekFilters.POSITIVE_ELEVATION]: [],
  };

  return {
    displayableAvailableFilters,
    setFilterValues,
    selectedFilters,
  };
};

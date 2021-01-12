import { BaseFilters, FilterValues, SelectedFilters, TrekFilters } from 'modules/filters/interface';
import { getDisplayableAvailableFilters } from 'modules/filters/utils';
import { useReducer } from 'react';
import { useQuery } from 'react-query';
import { filterReducer, setFilterValuesAction } from './filterReducer';

export const useFilter = () => {
  const { data: availableFilters } = useQuery('filters', getDisplayableAvailableFilters);

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

  const setFilterValues = (filter: BaseFilters | TrekFilters, values: FilterValues) =>
    dispatch(setFilterValuesAction(filter, values));

  return {
    availableFilters,
    setFilterValues,
    selectedFilters,
  };
};

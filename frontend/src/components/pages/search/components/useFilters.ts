import { getFiltersState } from 'modules/filters/utils';
import { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';
import { ActionKind, filterReducer } from './filterReducer';

export const useFilter = () => {
  const { data } = useQuery('filters', getFiltersState);

  const [filtersState, dispatch] = useReducer(filterReducer, []);

  // const setFilterValues = (filter: BaseFilters | TrekFilters, values: FilterValues) =>
  //   dispatch(setFilterValuesAction(filter, values));

  useEffect(() => {
    if (data !== undefined) {
      dispatch({
        type: ActionKind.InitFilterState,
        payload: data,
      });
    }
  }, [data]);

  return {
    filtersState,
    // setFilterValues,
  };
};

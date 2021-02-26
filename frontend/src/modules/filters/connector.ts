import { getTouristicContentCategoryHashMap } from 'modules/touristicContentCategory/connector';
import { getFiltersState, getInitialFiltersStateWithSelectedOptions } from './utils';

export const getInitialFilters = async (language: string, initialOptions: any) => {
  const initialFiltersState = await getFiltersState(language);
  const touristicContentCategoryMapping = await getTouristicContentCategoryHashMap(language);
  const initialFiltersStateWithSelectedOptions = getInitialFiltersStateWithSelectedOptions({
    initialFiltersState,
    initialOptions,
    touristicContentCategoryMapping,
  });
  return {
    initialFiltersState,
    touristicContentCategoryMapping,
    initialFiltersStateWithSelectedOptions,
  };
};

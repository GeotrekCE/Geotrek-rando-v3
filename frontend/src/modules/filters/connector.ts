import { getTouristicContentCategoryHashMap } from 'modules/touristicContentCategory/connector';
import { getOutdoorRatingHashMap } from '../outdoorRating/connector';
import { getOutdoorRatingScale } from '../outdoorRatingScale/connector';
import { getFiltersState, getInitialFiltersStateWithSelectedOptions } from './utils';

export const getInitialFilters = async (language: string, initialOptions: any) => {
  const initialFiltersState = await getFiltersState(language);
  const touristicContentCategoryMapping = await getTouristicContentCategoryHashMap(language);
  const outdoorRatingMapping = await getOutdoorRatingHashMap(language);
  const outdoorRatingScale = await getOutdoorRatingScale(language);

  const initialFiltersStateWithSelectedOptions = getInitialFiltersStateWithSelectedOptions({
    initialFiltersState,
    initialOptions,
    touristicContentCategoryMapping,
    outdoorRatingMapping,
    outdoorRatingScale,
  });
  return {
    initialFiltersState,
    touristicContentCategoryMapping,
    outdoorRatingMapping,
    outdoorRatingScale,
    initialFiltersStateWithSelectedOptions,
  };
};

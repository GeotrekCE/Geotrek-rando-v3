import { getTouristicContentCategoryHashMap } from 'modules/touristicContentCategory/connector';
import { getOutdoorPractices } from '../outdoorPractice/connector';
import { getOutdoorRatingHashMap } from '../outdoorRating/connector';
import { getOutdoorRatingScale } from '../outdoorRatingScale/connector';
import { getFiltersState, getInitialFiltersStateWithSelectedOptions } from './utils';

export const getInitialFilters = async (language: string, initialOptions: any) => {
  const initialFiltersState = await getFiltersState(language);
  const touristicContentCategoryMapping = await getTouristicContentCategoryHashMap(language);
  const outdoorRatingMapping = await getOutdoorRatingHashMap(language);
  const outdoorRatingScale = await getOutdoorRatingScale(language);
  const outdoorPractice = await getOutdoorPractices(language);

  const initialFiltersStateWithSelectedOptions = getInitialFiltersStateWithSelectedOptions({
    initialFiltersState,
    initialOptions,
    touristicContentCategoryMapping,
    outdoorRatingMapping,
    outdoorRatingScale,
    outdoorPractice,
  });

  return {
    initialFiltersState,
    touristicContentCategoryMapping,
    outdoorRatingMapping,
    outdoorRatingScale,
    outdoorPractice,
    initialFiltersStateWithSelectedOptions,
  };
};

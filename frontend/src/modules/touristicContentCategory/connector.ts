import {
  adaptTouristicContentCategories,
  adaptTouristicContentCategoryFilter,
  adaptTouristicContentCategoryHashMap,
} from './adapter';
import { fetchTouristicContentCategories } from './api';
import { TouristicContentCategoryDictionnary } from './interface';

export const getTouristicContentCategories = async (): Promise<TouristicContentCategoryDictionnary> => {
  const rawTouristicContentCats = await fetchTouristicContentCategories({ language: 'fr' });
  return adaptTouristicContentCategories(rawTouristicContentCats.results);
};

export const getTouristicContentCategoryFilter = async () => {
  const rawTouristicContentCategories = await fetchTouristicContentCategories({ language: 'fr' });
  return adaptTouristicContentCategoryFilter(rawTouristicContentCategories.results);
};

export const getTouristicContentCategoryHashMap = async () => {
  const rawTouristicContentCategories = await fetchTouristicContentCategories({ language: 'fr' });
  return adaptTouristicContentCategoryHashMap(rawTouristicContentCategories.results);
};

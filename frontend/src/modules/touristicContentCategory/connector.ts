import {
  adaptTouristicContentCategories,
  adaptTouristicContentCategory,
  adaptTouristicContentCategoryFilter,
  adaptTouristicContentCategoryHashMap,
} from './adapter';
import { fetchTouristicContentCategories, fetchTouristicContentCategory } from './api';
import { TouristicContentCategory, TouristicContentCategoryDictionnary } from './interface';

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

export const getTouristicContentCategory = async (
  id: number,
): Promise<TouristicContentCategory> => {
  const rawTouristicContentCategory = await fetchTouristicContentCategory({ language: 'fr' }, id);
  return adaptTouristicContentCategory(rawTouristicContentCategory);
};

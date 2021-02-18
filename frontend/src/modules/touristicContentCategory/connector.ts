import {
  adaptTouristicContentCategories,
  adaptTouristicContentCategory,
  adaptTouristicContentCategoryFilter,
  adaptTouristicContentCategoryHashMap,
} from './adapter';
import { fetchTouristicContentCategories, fetchTouristicContentCategory } from './api';
import { TouristicContentCategory, TouristicContentCategoryDictionnary } from './interface';

export const getTouristicContentCategories = async (
  language: string,
): Promise<TouristicContentCategoryDictionnary> => {
  const rawTouristicContentCats = await fetchTouristicContentCategories({ language });
  return adaptTouristicContentCategories(rawTouristicContentCats.results);
};

export const getTouristicContentCategoryFilter = async (language: string) => {
  const rawTouristicContentCategories = await fetchTouristicContentCategories({ language });
  return adaptTouristicContentCategoryFilter(rawTouristicContentCategories.results);
};

export const getTouristicContentCategoryHashMap = async (language: string) => {
  const rawTouristicContentCategories = await fetchTouristicContentCategories({ language });
  return adaptTouristicContentCategoryHashMap(rawTouristicContentCategories.results);
};

export const getTouristicContentCategory = async (
  id: number,
  language: string,
): Promise<TouristicContentCategory> => {
  const rawTouristicContentCategory = await fetchTouristicContentCategory({ language }, id);
  return adaptTouristicContentCategory(rawTouristicContentCategory);
};

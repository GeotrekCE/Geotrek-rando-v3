import { adaptTouristicContentCategories } from './adapter';
import { fetchTouristicContentCategories } from './api';
import { TouristicContentCategoryDictionnary } from './interface';

export const getTouristicContentCategories = async (): Promise<TouristicContentCategoryDictionnary> => {
  const rawTouristicContentCats = await fetchTouristicContentCategories({ language: 'fr' });
  return adaptTouristicContentCategories(rawTouristicContentCats.results);
};

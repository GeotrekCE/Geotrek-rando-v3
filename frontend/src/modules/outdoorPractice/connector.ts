import { adaptTouristicContentCategoryFilter } from '../touristicContentCategory/adapter';
import { fetchTouristicContentCategories } from '../touristicContentCategory/api';
import { adaptOutdoorPractices, adaptOutdoorPracticesFilter } from './adapter';
import { fetchOutdoorPractices } from './api';
import { OutdoorPracticeChoices } from './interface';

export const getOutdoorPractices = async (language: string): Promise<OutdoorPracticeChoices> => {
  const [rawOutdoorPracticesResult] = await Promise.all([fetchOutdoorPractices({ language })]);

  return adaptOutdoorPractices({
    rawOutdoorPractices: rawOutdoorPracticesResult.results,
  });
};

export const getOutdoorPracticesFilter = async (language: string) => {
  const rawOutdoorPractices = await fetchOutdoorPractices({ language });
  return adaptOutdoorPracticesFilter(rawOutdoorPractices.results);
};

import { FilterWithoutType } from 'modules/filters/interface';
import { getGlobalConfig } from '../utils/api.config';
import { adaptOutdoorRating, adaptOutdoorRatingFilter, adaptOutdoorRatingHashMap } from './adapter';
import { fetchOutdoorRating } from './api';
import { OutdoorRatingChoices, OutdoorRatingMapping } from './interface';

export const getOutdoorRating = async (language: string): Promise<OutdoorRatingChoices> => {
  const [rawOutdoorRatingResult] = await Promise.all([
    getGlobalConfig().enableOutdoor ? fetchOutdoorRating({ language }) : null,
  ]);

  return adaptOutdoorRating({
    rawOutdoorRating: rawOutdoorRatingResult?.results ?? [],
  });
};

export const getOutdoorRatingFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawOutdoorRating = getGlobalConfig().enableOutdoor
    ? await fetchOutdoorRating({ language })
    : null;
  return adaptOutdoorRatingFilter(rawOutdoorRating?.results ?? []);
};

export const getOutdoorRatingHashMap = async (language: string): Promise<OutdoorRatingMapping> => {
  const rawOutdoorRating = getGlobalConfig().enableOutdoor
    ? await fetchOutdoorRating({ language })
    : null;
  return adaptOutdoorRatingHashMap(rawOutdoorRating?.results ?? []);
};

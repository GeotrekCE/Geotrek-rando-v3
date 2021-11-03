import { getGlobalConfig } from '../utils/api.config';
import { adaptOutdoorRating, adaptOutdoorRatingFilter, adaptOutdoorRatingHashMap } from './adapter';
import { fetchOutdoorRating } from './api';
import { OutdoorRatingChoices } from './interface';

export const getOutdoorRating = async (language: string): Promise<OutdoorRatingChoices> => {
  const [rawOutdoorRatingResult] = await Promise.all([
    getGlobalConfig().enableOutdoor ? fetchOutdoorRating({ language }) : null,
  ]);

  return adaptOutdoorRating({
    rawOutdoorRating: rawOutdoorRatingResult?.results ?? [],
  });
};

export const getOutdoorRatingFilter = async (language: string) => {
  const rawOutdoorRating = getGlobalConfig().enableOutdoor
    ? await fetchOutdoorRating({ language })
    : null;
  return adaptOutdoorRatingFilter(rawOutdoorRating?.results ?? []);
};

export const getOutdoorRatingHashMap = async (language: string) => {
  const rawOutdoorRating = getGlobalConfig().enableOutdoor
    ? await fetchOutdoorRating({ language })
    : null;
  return adaptOutdoorRatingHashMap(rawOutdoorRating?.results ?? []);
};

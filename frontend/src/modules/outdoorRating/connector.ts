import { adaptOutdoorRating, adaptOutdoorRatingFilter } from './adapter';
import { fetchOutdoorRating } from './api';
import { OutdoorRatingChoices } from './interface';

export const getOutdoorRating = async (language: string): Promise<OutdoorRatingChoices> => {
  const [rawOutdoorRatingResult] = await Promise.all([fetchOutdoorRating({ language })]);

  return adaptOutdoorRating({
    rawOutdoorRating: rawOutdoorRatingResult.results,
  });
};

export const getOutdoorRatingFilter = async (language: string) => {
  const rawOutdoorRating = await fetchOutdoorRating({ language });
  return adaptOutdoorRatingFilter(rawOutdoorRating.results);
};

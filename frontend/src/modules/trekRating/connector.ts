import { adaptTrekRating, adaptTrekRatingHashMap } from './adapter';
import { fetchTrekRating } from './api';
import { TrekRatingChoices } from './interface';

export const getTrekRating = async (language: string): Promise<TrekRatingChoices> => {
  const [rawTrekRatingResult] = await Promise.all([fetchTrekRating({ language })]);

  return adaptTrekRating({
    rawTrekRating: rawTrekRatingResult?.results ?? [],
  });
};

export const getTrekRatingHashMap = async (language: string) => {
  const rawTrekRating = await fetchTrekRating({ language });
  return adaptTrekRatingHashMap(rawTrekRating?.results ?? []);
};

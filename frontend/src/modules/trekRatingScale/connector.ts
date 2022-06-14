import { adaptTrekRatingScale } from './adapter';
import { fetchTrekRatingScale } from './api';
import { TrekRatingScale } from './interface';

export const getTrekRatingScale = async (language: string): Promise<TrekRatingScale[]> => {
  const [rawTrekRatingScaleResult] = await Promise.all([fetchTrekRatingScale({ language })]);

  return adaptTrekRatingScale({
    rawTrekRatingScale: rawTrekRatingScaleResult?.results ?? [],
  });
};

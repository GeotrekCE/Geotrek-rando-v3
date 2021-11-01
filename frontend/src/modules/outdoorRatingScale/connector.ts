import { adaptOutdoorRatingScale } from './adapter';
import { fetchOutdoorRatingScale } from './api';
import { OutdoorRatingScale } from './interface';

export const getOutdoorRatingScale = async (language: string): Promise<OutdoorRatingScale[]> => {
  const [rawOutdoorRatingScaleResult] = await Promise.all([fetchOutdoorRatingScale({ language })]);

  return adaptOutdoorRatingScale({
    rawOutdoorRatingScale: rawOutdoorRatingScaleResult.results,
  });
};

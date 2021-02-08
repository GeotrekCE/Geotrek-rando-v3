import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { adaptTouristicContent } from './adapter';
import { fetchTouristicContent } from './api';
import { TouristicContent } from './interface';

export const getTouristicContentsNearTrek = async (
  nearTrekId: number,
): Promise<TouristicContent[]> => {
  const [rawTouristicContentResult, touristicContentCategories] = await Promise.all([
    fetchTouristicContent({ language: 'fr', near_trek: nearTrekId }),
    getTouristicContentCategories(),
  ]);
  return adaptTouristicContent({
    rawTouristicContent: rawTouristicContentResult.results,
    touristicContentCategories,
  });
};

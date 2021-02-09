import { getCities } from 'modules/city/connector';
import { getThemes } from 'modules/filters/theme/connector';
import { getSources } from 'modules/source/connector';
import {
  getTouristicContentCategories,
  getTouristicContentCategory,
} from 'modules/touristicContentCategory/connector';
import { adaptTouristicContent, adaptTouristicContentDetails } from './adapter';
import { fetchTouristicContent, fetchTouristicContentDetails } from './api';
import { TouristicContent, TouristicContentDetails } from './interface';

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

export const getTouristicContents = async (): Promise<TouristicContent[]> => {
  const [rawTouristicContentResult, touristicContentCategories] = await Promise.all([
    fetchTouristicContent({ language: 'fr' }),
    getTouristicContentCategories(),
  ]);
  return adaptTouristicContent({
    rawTouristicContent: rawTouristicContentResult.results,
    touristicContentCategories,
  });
};

export const getTouristicContentDetails = async (id: string): Promise<TouristicContentDetails> => {
  try {
    const [
      rawTouristicContentDetails,
      sourceDictionnary,
      cityDictionnary,
      themeDictionnary,
    ] = await Promise.all([
      fetchTouristicContentDetails({ language: 'fr' }, id),
      getSources(),
      getCities(),
      getThemes(),
    ]);
    const touristicContentCategory = await getTouristicContentCategory(
      rawTouristicContentDetails.category,
    );
    return adaptTouristicContentDetails({
      rawTCD: rawTouristicContentDetails,
      touristicContentCategory,
      sourceDictionnary,
      cityDictionnary,
      themeDictionnary,
    });
  } catch (e) {
    console.error('Error in touristicContent connector', e);
    throw e;
  }
};

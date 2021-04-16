import { getCities } from 'modules/city/connector';
import { getThemes } from 'modules/filters/theme/connector';
import { getSources } from 'modules/source/connector';
import {
  getTouristicContentCategories,
  getTouristicContentCategory,
} from 'modules/touristicContentCategory/connector';
import { PopupResult } from 'modules/trekResult/interface';
import { getGlobalConfig } from 'modules/utils/api.config';
import {
  adaptTouristicContent,
  adaptTouristicContentDetails,
  adaptTouristicContentPopupResults,
} from './adapter';
import {
  fetchTouristicContent,
  fetchTouristicContentDetails,
  fetchTouristicContentPopupResult,
} from './api';
import { TouristicContent, TouristicContentDetails } from './interface';

export const getTouristicContentsNearTrek = async (
  nearTrekId: number,
  language: string,
): Promise<TouristicContent[]> => {
  const pageSize = getGlobalConfig().maxTouristicContentPerPage;
  const [rawTouristicContentResult, touristicContentCategories] = await Promise.all([
    fetchTouristicContent({ language, near_trek: nearTrekId, page_size: pageSize }),
    getTouristicContentCategories(language),
  ]);
  return adaptTouristicContent({
    rawTouristicContent: rawTouristicContentResult.results,
    touristicContentCategories,
  });
};

export const getTouristicContents = async (language: string): Promise<TouristicContent[]> => {
  const [rawTouristicContentResult, touristicContentCategories] = await Promise.all([
    fetchTouristicContent({ language }),
    getTouristicContentCategories(language),
  ]);
  return adaptTouristicContent({
    rawTouristicContent: rawTouristicContentResult.results,
    touristicContentCategories,
  });
};

export const getTouristicContentDetails = async (
  id: string,
  language: string,
): Promise<TouristicContentDetails> => {
  try {
    const [
      rawTouristicContentDetails,
      sourceDictionnary,
      cityDictionnary,
      themeDictionnary,
    ] = await Promise.all([
      fetchTouristicContentDetails({ language }, id),
      getSources(language),
      getCities(language),
      getThemes(language),
    ]);
    const touristicContentCategory = await getTouristicContentCategory(
      rawTouristicContentDetails.properties.category,
      language,
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

export const getTouristicContentPopupResult = async (
  id: string,
  language: string,
): Promise<PopupResult> => {
  const [rawTouristicContentPopupResult, cityDictionnary] = await Promise.all([
    fetchTouristicContentPopupResult({ language }, id),
    getCities(language),
  ]);

  return adaptTouristicContentPopupResults(rawTouristicContentPopupResult, cityDictionnary);
};

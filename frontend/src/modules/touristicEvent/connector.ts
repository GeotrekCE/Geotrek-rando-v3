import { getCities } from '../city/connector';
import { getThemes } from '../filters/theme/connector';
import { getSources } from '../source/connector';
import { getTouristicContentsNearTarget } from '../touristicContent/connector';
import { PopupResult } from '../trekResult/interface';
import {
  adaptTouristicEventDetails,
  adaptTouristicEventPopupResults,
  adaptTouristicEvents,
} from './adapter';
import { fetchTouristicEventDetails, fetchTouristicEvents } from './api';
import { TouristicEvent, TouristicEventDetails } from './interface';

export const getTouristicEvents = async (
  language: string,
  query = {},
): Promise<TouristicEvent[]> => {
  const [rawTouristicEventResult, themeDictionnary, cityDictionnary] = await Promise.all([
    fetchTouristicEvents({ ...query, language }),
    getThemes(language),
    getCities(language),
  ]);

  return adaptTouristicEvents({
    rawTouristicEvents: rawTouristicEventResult.results,
    themeDictionnary,
    cityDictionnary,
  });
};

export const getTouristicEventDetails = async (
  id: string,
  language: string,
): Promise<TouristicEventDetails> => {
  try {
    const [
      rawTouristicEventDetails,
      themeDictionnary,
      cityDictionnary,
      touristicContents,
      sourcesDictionnary,
    ] = await Promise.all([
      fetchTouristicEventDetails({ language }, id),
      getThemes(language),
      getCities(language),
      getTouristicContentsNearTarget(Number(id), language, 'near_touristicevent'),
      getSources(language),
    ]);

    return adaptTouristicEventDetails({
      rawTouristicEventDetails,
      themeDictionnary,
      cityDictionnary,
      touristicContents,
      sourcesDictionnary,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

export const getTouristicEventPopupResult = async (
  id: string,
  language: string,
): Promise<PopupResult> => {
  const rawTouristicEventPopupResult = await fetchTouristicEventDetails({ language }, id);

  const [cityDictionnary] = await Promise.all([getCities(language)]);

  return adaptTouristicEventPopupResults({ rawTouristicEventPopupResult, cityDictionnary });
};

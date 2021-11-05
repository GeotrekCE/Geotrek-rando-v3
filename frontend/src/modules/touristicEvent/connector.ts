import { getCities } from '../city/connector';
import { getThemes } from '../filters/theme/connector';
import { adaptOutdoorSitePopupResults } from '../outdoorSite/adapter';
import { fetchOutdoorSiteDetails } from '../outdoorSite/api';
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
    const [rawTouristicEventDetails, themeDictionnary, cityDictionnary] = await Promise.all([
      fetchTouristicEventDetails({ language }, id),
      getThemes(language),
      getCities(language),
    ]);

    return adaptTouristicEventDetails({
      rawTouristicEventDetails,
      themeDictionnary,
      cityDictionnary,
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

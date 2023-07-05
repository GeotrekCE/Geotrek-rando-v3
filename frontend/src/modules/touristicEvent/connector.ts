import { GeometryObject } from 'modules/interface';
import { adaptGeometry } from 'modules/utils/geometry';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { getTouristicContentsNearTarget } from '../touristicContent/connector';
import { getTouristicEventTypes } from '../touristicEventType/connector';
import { PopupResult } from '../trekResult/interface';
import { adaptTouristicEventDetails, adaptTouristicEventPopupResults } from './adapter';
import { fetchTouristicEventDetails, fetchTouristicEventResult } from './api';
import { TouristicEventDetails } from './interface';

export const getTouristicEventDetails = async (
  id: string,
  language: string,
  commonDictionaries?: CommonDictionaries,
): Promise<TouristicEventDetails> => {
  try {
    const { themes = {}, cities = {}, sources = [] } = commonDictionaries ?? {};
    const [rawTouristicEventDetails, touristicContents, touristicEventType] = await Promise.all([
      fetchTouristicEventDetails({ language }, id),
      getTouristicContentsNearTarget(Number(id), language, 'near_touristicevent'),
      getTouristicEventTypes(language),
    ]);

    return adaptTouristicEventDetails({
      rawTouristicEventDetails,
      themeDictionnary: themes,
      cityDictionnary: cities,
      touristicContents,
      sourcesDictionnary: sources,
      touristicEventType,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

export const getTouristicEventPopupResult = async (
  id: string,
  language: string,
  commonDictionaries?: CommonDictionaries,
): Promise<PopupResult> => {
  const rawTouristicEventPopupResult = await fetchTouristicEventDetails({ language }, id);

  const { cities = {} } = commonDictionaries ?? {};

  return adaptTouristicEventPopupResults({ rawTouristicEventPopupResult, cityDictionnary: cities });
};

export const getTouristicEventGeometryResult = async (
  id: string,
  language: string,
): Promise<GeometryObject> => {
  const rawTouristicEventGeometryResult = await fetchTouristicEventResult({ language }, id);
  return adaptGeometry(rawTouristicEventGeometryResult.geometry);
};

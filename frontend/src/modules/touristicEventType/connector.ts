import { FilterWithoutType } from 'modules/filters/interface';
import { getGlobalConfig } from '../utils/api.config';
import { adaptTouristicEventTypes, adaptTouristicEventTypesFilter } from './adapter';
import { fetchTouristicEventTypes } from './api';
import { TouristicEventTypeChoices } from './interface';

export const getTouristicEventTypes = async (
  language: string,
): Promise<TouristicEventTypeChoices> => {
  const rawTouristicEventTypes = getGlobalConfig().enableTouristicEvents
    ? await fetchTouristicEventTypes({ language })
    : null;

  return adaptTouristicEventTypes({
    rawTouristicEventTypes: rawTouristicEventTypes ? rawTouristicEventTypes.results : [],
  });
};

export const getTouristicEventTypesFilter = async (
  language: string,
): Promise<FilterWithoutType> => {
  const rawTouristicEventTypes = getGlobalConfig().enableTouristicEvents
    ? await fetchTouristicEventTypes({ language })
    : null;

  return adaptTouristicEventTypesFilter(
    rawTouristicEventTypes ? rawTouristicEventTypes.results : [],
  );
};

import { FilterWithoutType } from 'modules/filters/interface';
import { getGlobalConfig } from '../utils/api.config';
import { adaptOutdoorPractices, adaptOutdoorPracticesFilter } from './adapter';
import { fetchOutdoorPractices } from './api';
import { OutdoorPracticeChoices } from './interface';

export const getOutdoorPractices = async (language: string): Promise<OutdoorPracticeChoices> => {
  const rawOutdoorPracticesResult = getGlobalConfig().enableOutdoor
    ? await fetchOutdoorPractices({ language })
    : null;

  return adaptOutdoorPractices({
    rawOutdoorPractices: rawOutdoorPracticesResult ? rawOutdoorPracticesResult.results : [],
  });
};

export const getOutdoorPracticesFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawOutdoorPractices = getGlobalConfig().enableOutdoor
    ? await fetchOutdoorPractices({ language })
    : null;

  return adaptOutdoorPracticesFilter(rawOutdoorPractices ? rawOutdoorPractices.results : []);
};

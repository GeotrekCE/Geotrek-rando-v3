import { adaptOutdoorPractices } from './adapter';
import { fetchOutdoorPractices } from './api';
import { OutdoorPractice } from './interface';

export const getOutdoorPractices = async (language: string): Promise<OutdoorPractice[]> => {
  const [rawOutdoorPracticesResult] = await Promise.all([fetchOutdoorPractices({ language })]);

  return adaptOutdoorPractices({
    rawOutdoorPractices: rawOutdoorPracticesResult.results,
  });
};

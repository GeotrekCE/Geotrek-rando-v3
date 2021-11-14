import { getGlobalConfig } from '../utils/api.config';
import { adaptOutdoorSiteType } from './adapter';
import { fetchOutdoorSiteType } from './api';
import { OutdoorSiteTypeChoices } from './interface';

export const getOutdoorSiteType = async (language: string): Promise<OutdoorSiteTypeChoices> => {
  const [rawOutdoorSiteTypeResult] = await Promise.all([
    getGlobalConfig().enableOutdoor ? fetchOutdoorSiteType({ language }) : null,
  ]);

  return adaptOutdoorSiteType({
    rawOutdoorSiteType: rawOutdoorSiteTypeResult?.results ?? [],
  });
};

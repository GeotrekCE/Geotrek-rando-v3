import { adaptOutdoorSiteDetails, adaptOutdoorSites } from './adapter';
import { fetchOutdoorSiteDetails, fetchOutdoorSites } from './api';
import { OutdoorSite, OutdoorSiteDetails } from './interface';

export const getOutdoorSites = async (language: string): Promise<OutdoorSite[]> => {
  const [rawOutdoorSitesResult] = await Promise.all([fetchOutdoorSites({ language })]);

  return adaptOutdoorSites({
    rawOutdoorSites: rawOutdoorSitesResult.results,
  });
};

export const getOutdoorSiteDetails = async (
  id: string,
  language: string,
): Promise<OutdoorSiteDetails> => {
  try {
    const [rawOutdoorSiteDetails] = await Promise.all([
      fetchOutdoorSiteDetails({ language }, id),
    ]);

    return adaptOutdoorSiteDetails({
      rawOutdoorSiteDetails,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

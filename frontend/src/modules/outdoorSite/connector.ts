import { getActivities } from '../activities/connector';
import { getThemes } from '../filters/theme/connector';
import { getInformationDesks } from '../informationDesk/connector';
import { getLabels } from '../label/connector';
import { getOutdoorCourses } from '../outdoorCourse/connector';
import { getPois } from '../poi/connector';
import { getSources } from '../source/connector';
import { PopupResult } from '../trekResult/interface';
import {
  adaptOutdoorSiteDetails,
  adaptOutdoorSitePopupResults,
  adaptOutdoorSites,
} from './adapter';
import { fetchOutdoorSiteDetails, fetchOutdoorSites } from './api';
import { OutdoorSite, OutdoorSiteDetails } from './interface';

export const getOutdoorSites = async (language: string, query = {}): Promise<OutdoorSite[]> => {
  const [rawOutdoorSitesResult, themeDictionnary, activitiesDictionnary] = await Promise.all([
    fetchOutdoorSites({ ...query, language }),
    getThemes(language),
    getActivities(language),
  ]);

  return adaptOutdoorSites({
    rawOutdoorSites: rawOutdoorSitesResult.results,
    themeDictionnary,
    activitiesDictionnary,
  });
};

export const getOutdoorSiteDetails = async (
  id: string,
  language: string,
): Promise<OutdoorSiteDetails> => {
  try {
    const [
      rawOutdoorSiteDetails,
      pois,
      themeDictionnary,
      labelsDictionnary,
      sourcesDictionnary,
      informationDesksDictionnary,
      children,
      courses,
      activitiesDictionnary,
    ] = await Promise.all([
      fetchOutdoorSiteDetails({ language }, id),
      getPois(Number(id), language, 'sites'),
      getThemes(language),
      getLabels(language),
      getSources(language),
      getInformationDesks(language),
      getOutdoorSites(language, { near_outdoorsite: id }),
      getOutdoorCourses(language, { near_outdoorsite: id }),
      getActivities(language),
    ]);

    return adaptOutdoorSiteDetails({
      rawOutdoorSiteDetails,
      pois,
      themeDictionnary,
      labelsDictionnary,
      sourcesDictionnary,
      informationDesksDictionnary,
      children,
      courses,
      activitiesDictionnary,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

export const getOutdoorSitePopupResult = async (
  id: string,
  language: string,
): Promise<PopupResult> => {
  const rawOutdoorSitePopupResult = await fetchOutdoorSiteDetails({ language }, id);

  return adaptOutdoorSitePopupResults(rawOutdoorSitePopupResult);
};

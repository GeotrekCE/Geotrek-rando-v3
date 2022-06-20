import { getSensitiveAreas } from 'modules/sensitiveArea/connector';
import { getSignage } from 'modules/signage/connector';
import { getService } from 'modules/service/connector';
import { getInfrastructure } from 'modules/infrastructure/connector';
import { getCities } from '../city/connector';
import { getThemes } from '../filters/theme/connector';
import { getInformationDesks } from '../informationDesk/connector';
import { getLabels } from '../label/connector';
import { getOutdoorCourses } from '../outdoorCourse/connector';
import { getOutdoorPractices } from '../outdoorPractice/connector';
import { getOutdoorRating } from '../outdoorRating/connector';
import { getOutdoorRatingScale } from '../outdoorRatingScale/connector';
import { getOutdoorSiteType } from '../outdoorSiteType/connector';
import { getPois } from '../poi/connector';
import { getTrekResults } from '../results/connector';
import { getSources } from '../source/connector';
import { getTouristicContentsNearTarget } from '../touristicContent/connector';
import { PopupResult } from '../trekResult/interface';
import { getGlobalConfig } from '../utils/api.config';
import {
  adaptOutdoorSiteDetails,
  adaptOutdoorSitePopupResults,
  adaptOutdoorSites,
} from './adapter';
import { fetchOutdoorSiteDetails, fetchOutdoorSites } from './api';
import { OutdoorSite, OutdoorSiteDetails } from './interface';

export const getOutdoorSites = async (language: string, query = {}): Promise<OutdoorSite[]> => {
  const [rawOutdoorSitesResult, themeDictionnary, outdoorPracticeDictionnary, cityDictionnary] =
    await Promise.all([
      getGlobalConfig().enableOutdoor ? fetchOutdoorSites({ ...query, language }) : null,
      getThemes(language),
      getOutdoorPractices(language),
      getCities(language),
    ]);

  return adaptOutdoorSites({
    rawOutdoorSites: rawOutdoorSitesResult?.results ?? [],
    themeDictionnary,
    outdoorPracticeDictionnary,
    cityDictionnary,
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
      outdoorPracticeDictionnary,
      touristicContents,
    ] = await Promise.all([
      fetchOutdoorSiteDetails({ language }, id),
      getPois(Number(id), language, 'sites'),
      getThemes(language),
      getLabels(language),
      getSources(language),
      getInformationDesks(language),
      getOutdoorSites(language, { near_outdoorsite: id }),
      getOutdoorCourses(language, { near_outdoorsite: id }),
      getOutdoorPractices(language),
      getTouristicContentsNearTarget(Number(id), language, 'near_outdoorsite'),
    ]);

    const [
      access,
      outdoorPractice,
      cityDictionnary,
      outdoorRating,
      outdoorRatingScale,
      outdoorSiteType,
      signage,
      service,
      infrastructure,
      sensitiveAreas,
    ] = await Promise.all([
      getTrekResults(language, { near_outdoorsite: Number(id) }),
      getOutdoorPractices(language),
      getCities(language),
      getOutdoorRating(language),
      getOutdoorRatingScale(language),
      getOutdoorSiteType(language),
      getSignage(language, id, 'OUTDOOR_SITE'),
      getService(language, id, 'OUTDOOR_SITE'),
      getInfrastructure(language, id, 'OUTDOOR_SITE'),
      getGlobalConfig().enableSensitiveAreas
        ? getSensitiveAreas('outdoorSite', Number(id), language)
        : [],
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
      outdoorPracticeDictionnary,
      touristicContents,
      access,
      outdoorPractice,
      cityDictionnary,
      outdoorRating,
      outdoorRatingScale,
      outdoorSiteType,
      sensitiveAreas,
      signage,
      service,
      infrastructure,
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

  const [cityDictionnary] = await Promise.all([getCities(language)]);

  return adaptOutdoorSitePopupResults({ rawOutdoorSitePopupResult, cityDictionnary });
};

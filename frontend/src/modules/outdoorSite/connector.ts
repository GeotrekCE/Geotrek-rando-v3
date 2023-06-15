import { getSensitiveAreas } from 'modules/sensitiveArea/connector';
import { getSignage } from 'modules/signage/connector';
import { getService } from 'modules/service/connector';
import { getInfrastructure } from 'modules/infrastructure/connector';
import { adaptGeometry } from 'modules/utils/geometry';
import { GeometryObject } from 'modules/interface';
import { getCities } from '../city/connector';
import { getThemes } from '../filters/theme/connector';
import { getInformationDesks } from '../informationDesk/connector';
import { getLabels } from '../label/connector';
import { getOutdoorCoursesResult } from '../outdoorCourse/connector';
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
  adaptoutdoorSitesResult,
} from './adapter';
import { fetchOutdoorSiteDetails, fetchOutdoorSiteResult, fetchOutdoorSites } from './api';
import { OutdoorSite, OutdoorSiteDetails, OutdoorSiteResult } from './interface';

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

export const getOutdoorSitesResult = async (
  language: string,
  children: number[],
): Promise<OutdoorSiteResult[]> => {
  if (!getGlobalConfig().enableOutdoor || children.length === 0) {
    return [];
  }

  const outdoorSiteChildren = await Promise.all(
    children.map(id => {
      return fetchOutdoorSiteDetails({ language }, id.toString());
    }),
  );
  const [themeDictionnary, outdoorPracticeDictionnary, cityDictionnary] = await Promise.all([
    getThemes(language),
    getOutdoorPractices(language),
    getCities(language),
  ]);

  return adaptoutdoorSitesResult({
    rawOutdoorSites: outdoorSiteChildren.map(
      ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
    ),
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
    const rawOutdoorSiteDetails = await fetchOutdoorSiteDetails({ language }, id);
    const [
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
      getPois(Number(id), language, 'sites'),
      getThemes(language),
      getLabels(language),
      getSources(language),
      getInformationDesks(language),
      getOutdoorSitesResult(language, rawOutdoorSiteDetails.properties.children),
      getOutdoorCoursesResult(language, rawOutdoorSiteDetails.properties.courses),
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

export const getOutdoorSiteGeometryResult = async (
  id: string,
  language: string,
): Promise<GeometryObject> => {
  const rawOutdoorGeometryResult = await fetchOutdoorSiteResult({ language }, id);
  return adaptGeometry(rawOutdoorGeometryResult.geometry);
};

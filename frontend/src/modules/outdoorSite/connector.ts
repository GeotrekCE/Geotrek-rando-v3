import { getSensitiveAreas } from 'modules/sensitiveArea/connector';
import { getSignage } from 'modules/signage/connector';
import { getService } from 'modules/service/connector';
import { getInfrastructure } from 'modules/infrastructure/connector';
import { adaptGeometry } from 'modules/utils/geometry';
import { GeometryObject } from 'modules/interface';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { adaptViewPoints } from 'modules/viewPoint/adapter';
import { getOutdoorCoursesResult } from '../outdoorCourse/connector';
import { getOutdoorPractices } from '../outdoorPractice/connector';
import { getOutdoorRating } from '../outdoorRating/connector';
import { getOutdoorRatingScale } from '../outdoorRatingScale/connector';
import { getOutdoorSiteType } from '../outdoorSiteType/connector';
import { getPois } from '../poi/connector';
import { getTrekResults } from '../results/connector';
import { getTouristicContentsNearTarget } from '../touristicContent/connector';
import { PopupResult } from '../trekResult/interface';
import { getGlobalConfig } from '../utils/api.config';
import {
  adaptOutdoorSiteDetails,
  adaptOutdoorSitePopupResults,
  adaptoutdoorSitesResult,
} from './adapter';
import { fetchOutdoorSiteDetails, fetchOutdoorSiteResult } from './api';
import { OutdoorSiteDetails, OutdoorSiteResult } from './interface';

export const getOutdoorSitesResult = async (
  language: string,
  children: number[],
  commonDictionaries?: CommonDictionaries,
): Promise<OutdoorSiteResult[]> => {
  if (!getGlobalConfig().enableOutdoor || children.length === 0) {
    return [];
  }

  const { cities = {}, themes = {} } = commonDictionaries ?? {};

  const outdoorSiteChildren = await Promise.all(
    children.map(id => {
      return fetchOutdoorSiteDetails({ language }, id.toString());
    }),
  );
  const outdoorPracticeDictionnary = await getOutdoorPractices(language);

  return adaptoutdoorSitesResult({
    rawOutdoorSites: outdoorSiteChildren.map(
      ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
    ),
    themeDictionnary: themes,
    outdoorPracticeDictionnary,
    cityDictionnary: cities,
  });
};

export const getOutdoorSiteDetails = async (
  id: string,
  language: string,
  commonDictionaries?: CommonDictionaries,
): Promise<OutdoorSiteDetails> => {
  try {
    const {
      themes = {},
      cities = {},
      sources = [],
      informationDesk = {},
      labels = {},
    } = commonDictionaries ?? {};

    const rawOutdoorSiteDetails = await fetchOutdoorSiteDetails({ language }, id);
    const [pois, children, courses, outdoorPractice, touristicContents] = await Promise.all([
      getPois(Number(id), language, 'sites'),
      getOutdoorSitesResult(
        language,
        rawOutdoorSiteDetails.properties.children,
        commonDictionaries,
      ),
      getOutdoorCoursesResult(
        language,
        rawOutdoorSiteDetails.properties.courses,
        commonDictionaries,
      ),
      getOutdoorPractices(language),
      getTouristicContentsNearTarget(Number(id), language, 'near_outdoorsite'),
    ]);

    const [
      access,
      outdoorRating,
      outdoorRatingScale,
      outdoorSiteType,
      signage,
      service,
      infrastructure,
      sensitiveAreas,
    ] = await Promise.all([
      getTrekResults(
        language,
        { near_outdoorsite: Number(id) },
        {
          cities,
          themes,
          sources,
          informationDesk,
          labels,
        },
      ),
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

    const viewPoints = await adaptViewPoints(
      language,
      rawOutdoorSiteDetails.properties.view_points ?? [],
    );

    return adaptOutdoorSiteDetails({
      rawOutdoorSiteDetails,
      pois,
      themeDictionnary: themes,
      labelsDictionnary: labels,
      sourcesDictionnary: sources,
      informationDesksDictionnary: informationDesk,
      children,
      courses,
      touristicContents,
      access,
      outdoorPractice,
      cityDictionnary: cities,
      outdoorRating,
      outdoorRatingScale,
      outdoorSiteType,
      sensitiveAreas,
      signage,
      service,
      infrastructure,
      viewPoints,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

export const getOutdoorSitePopupResult = async (
  id: string,
  language: string,
  commonDictionaries?: CommonDictionaries,
): Promise<PopupResult> => {
  const rawOutdoorSitePopupResult = await fetchOutdoorSiteDetails({ language }, id);

  const { cities = {} } = commonDictionaries ?? {};

  return adaptOutdoorSitePopupResults({ rawOutdoorSitePopupResult, cityDictionnary: cities });
};

export const getOutdoorSiteGeometryResult = async (
  id: string,
  language: string,
): Promise<GeometryObject> => {
  const rawOutdoorGeometryResult = await fetchOutdoorSiteResult({ language }, id);
  return adaptGeometry(rawOutdoorGeometryResult.geometry);
};

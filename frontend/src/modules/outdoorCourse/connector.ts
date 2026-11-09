import { getSensitiveAreas } from 'modules/sensitiveArea/connector';
import { getVigilanceAreas } from 'modules/vigilanceArea/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getSignage } from 'modules/signage/connector';
import { getService } from 'modules/service/connector';
import { getInfrastructure } from 'modules/infrastructure/connector';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { PopupResult } from 'modules/trekResult/interface';
import { getOutdoorCourseType } from '../outdoorCourseType/connector';
import { getOutdoorRating } from '../outdoorRating/connector';
import { getOutdoorRatingScale } from '../outdoorRatingScale/connector';
import { getPois } from '../poi/connector';
import { getTouristicContentsNearTarget } from '../touristicContent/connector';
import {
  adaptOutdoorCourseDetails,
  adaptOutdoorCoursePopupResults,
  adaptOutdoorCoursesResult,
} from './adapter';
import { fetchOutdoorCourseDetails } from './api';
import { OutdoorCourseDetails, OutdoorCourseResult } from './interface';

export const getOutdoorCoursesResult = async (
  language: string,
  courses: number[],
  commonDictionaries?: CommonDictionaries,
): Promise<OutdoorCourseResult[]> => {
  if (courses.length === 0) {
    return [];
  }
  const rawOutdoorCourses = await Promise.all(
    courses.map(id => {
      return fetchOutdoorCourseDetails({ language }, id.toString());
    }),
  );

  const { cities = {} } = commonDictionaries ?? {};

  return adaptOutdoorCoursesResult({
    rawOutdoorCourses: rawOutdoorCourses.map(
      ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
    ),
    cityDictionnary: cities,
  });
};

export const getOutdoorCourseDetails = async (
  id: string,
  language: string,
  commonDictionaries?: CommonDictionaries,
): Promise<OutdoorCourseDetails> => {
  try {
    const { cities = {} } = commonDictionaries ?? {};

    const rawOutdoorCourseDetails = await fetchOutdoorCourseDetails({ language }, id);

    const [
      pois,
      touristicContents,
      outdoorRating,
      outdoorRatingScale,
      outdoorCourseType,
      sensitiveAreas,
      publishedVigilanceAreas,
    ] = await Promise.all([
      getPois(Number(id), language, 'courses'),
      getTouristicContentsNearTarget(Number(id), language, 'near_outdoorcourse'),
      getOutdoorRating(language),
      getOutdoorRatingScale(language),
      getOutdoorCourseType(language),
      getGlobalConfig().enableSensitiveAreas
        ? getSensitiveAreas('outdoorCourse', Number(id), language)
        : [],
      getGlobalConfig().enableVigilanceAreas
        ? getVigilanceAreas(
            rawOutdoorCourseDetails.properties.published_vigilance_areas ?? [],
            language,
          )
        : [],
    ]);

    const [signage, service, infrastructure] = await Promise.all([
      getSignage(language, id, 'OUTDOOR_COURSE'),
      getService(language, id, 'OUTDOOR_COURSE'),
      getInfrastructure(language, id, 'OUTDOOR_COURSE'),
    ]);

    return adaptOutdoorCourseDetails({
      rawOutdoorCourseDetails,
      pois,
      touristicContents,
      cityDictionnary: cities,
      outdoorRating,
      outdoorRatingScale,
      outdoorCourseType,
      sensitiveAreas,
      publishedVigilanceAreas,
      signage,
      service,
      infrastructure,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

export const getOutdoorCoursePopupResult = async (
  id: string,
  language: string,
  commonDictionaries?: CommonDictionaries,
): Promise<PopupResult> => {
  const rawOutdoorSitePopupResult = await fetchOutdoorCourseDetails({ language }, id);

  const { cities = {} } = commonDictionaries ?? {};

  return adaptOutdoorCoursePopupResults({ rawOutdoorSitePopupResult, cityDictionnary: cities });
};

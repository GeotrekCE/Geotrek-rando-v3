import { getSensitiveAreas } from 'modules/sensitiveArea/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getSignage } from 'modules/signage/connector';
import { getService } from 'modules/service/connector';
import { getInfrastructure } from 'modules/infrastructure/connector';
import { getCities } from '../city/connector';
import { getOutdoorCourseType } from '../outdoorCourseType/connector';
import { getOutdoorRating } from '../outdoorRating/connector';
import { getOutdoorRatingScale } from '../outdoorRatingScale/connector';
import { getPois } from '../poi/connector';
import { getTouristicContentsNearTarget } from '../touristicContent/connector';
import {
  adaptOutdoorCourseDetails,
  adaptOutdoorCourses,
  adaptOutdoorCoursesResult,
} from './adapter';
import { fetchOutdoorCourseDetails, fetchOutdoorCourses } from './api';
import { OutdoorCourse, OutdoorCourseDetails, OutdoorCourseResult } from './interface';

export const getOutdoorCourses = async (language: string, query = {}): Promise<OutdoorCourse[]> => {
  const [rawOutdoorCoursesResult, cityDictionnary] = await Promise.all([
    fetchOutdoorCourses({ ...query, language }),
    getCities(language),
  ]);

  return adaptOutdoorCourses({
    rawOutdoorCourses: rawOutdoorCoursesResult.results,
    cityDictionnary,
  });
};

export const getOutdoorCoursesResult = async (
  language: string,
  courses: number[],
): Promise<OutdoorCourseResult[]> => {
  if (courses.length === 0) {
    return [];
  }
  const rawOutdoorCourses = await Promise.all(
    courses.map(id => {
      return fetchOutdoorCourseDetails({ language }, id.toString());
    }),
  );

  const cityDictionnary = await getCities(language);

  return adaptOutdoorCoursesResult({
    rawOutdoorCourses: rawOutdoorCourses.map(
      ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
    ),
    cityDictionnary,
  });
};

export const getOutdoorCourseDetails = async (
  id: string,
  language: string,
): Promise<OutdoorCourseDetails> => {
  try {
    // Typescript limit for Promise.all is for 10 promises
    const [
      rawOutdoorCourseDetails,
      pois,
      touristicContents,
      cityDictionnary,
      outdoorRating,
      outdoorRatingScale,
      outdoorCourseType,
      sensitiveAreas,
    ] = await Promise.all([
      fetchOutdoorCourseDetails({ language }, id),
      getPois(Number(id), language, 'courses'),
      getTouristicContentsNearTarget(Number(id), language, 'near_outdoorcourse'),
      getCities(language),
      getOutdoorRating(language),
      getOutdoorRatingScale(language),
      getOutdoorCourseType(language),
      getGlobalConfig().enableSensitiveAreas
        ? getSensitiveAreas('outdoorCourse', Number(id), language)
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
      cityDictionnary,
      outdoorRating,
      outdoorRatingScale,
      outdoorCourseType,
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

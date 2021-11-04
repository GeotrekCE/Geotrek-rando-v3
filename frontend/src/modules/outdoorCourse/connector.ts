import { getCities } from '../city/connector';
import { getPois } from '../poi/connector';
import { getTouristicContentsNearTarget } from '../touristicContent/connector';
import { adaptOutdoorCourseDetails, adaptOutdoorCourses } from './adapter';
import { fetchOutdoorCourseDetails, fetchOutdoorCourses } from './api';
import { OutdoorCourse, OutdoorCourseDetails } from './interface';

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

export const getOutdoorCourseDetails = async (
  id: string,
  language: string,
): Promise<OutdoorCourseDetails> => {
  try {
    const [rawOutdoorCourseDetails, pois, touristicContents, cityDictionnary] = await Promise.all([
      fetchOutdoorCourseDetails({ language }, id),
      getPois(Number(id), language, 'courses'),
      getTouristicContentsNearTarget(Number(id), language, 'near_outdoorcourse'),
      getCities(language),
    ]);

    return adaptOutdoorCourseDetails({
      rawOutdoorCourseDetails,
      pois,
      touristicContents,
      cityDictionnary,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

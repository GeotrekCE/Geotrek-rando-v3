import { adaptOutdoorCourseDetails, adaptOutdoorCourses } from './adapter';
import { fetchOutdoorCourseDetails, fetchOutdoorCourses } from './api';
import { OutdoorCourse, OutdoorCourseDetails } from './interface';

export const getOutdoorCourses = async (language: string): Promise<OutdoorCourse[]> => {
  const [rawOutdoorCoursesResult] = await Promise.all([fetchOutdoorCourses({ language })]);

  return adaptOutdoorCourses({
    rawOutdoorCourses: rawOutdoorCoursesResult.results,
  });
};

export const getOutdoorCourseDetails = async (
  id: string,
  language: string,
): Promise<OutdoorCourseDetails> => {
  try {
    const [rawOutdoorCourseDetails] = await Promise.all([
      fetchOutdoorCourseDetails({ language }, id),
    ]);

    return adaptOutdoorCourseDetails({
      rawOutdoorCourseDetails,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

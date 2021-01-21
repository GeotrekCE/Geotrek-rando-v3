import { adaptCourseType, adaptSingleCourseType } from './adapter';
import { fetchCourseType, fetchCourseTypes } from './api';
import { CourseType } from './interface';

export const getCourseTypeFilter = async () => {
  const rawCourseTypes = await fetchCourseTypes({ language: 'fr' });
  return adaptCourseType(rawCourseTypes.results);
};

export const getCourseType = async (id: number | null): Promise<CourseType | null> => {
  if (id === null) return null;
  const rawCourseType = await fetchCourseType({ language: 'fr' }, id);
  return adaptSingleCourseType(rawCourseType);
};

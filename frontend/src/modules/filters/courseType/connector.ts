import { FilterWithoutType } from '../interface';
import { adaptCourseType, adaptSingleCourseType } from './adapter';
import { fetchCourseType, fetchCourseTypes } from './api';
import { CourseType } from './interface';

export const getCourseTypeFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawCourseTypes = await fetchCourseTypes({ language });
  return adaptCourseType(rawCourseTypes.results);
};

export const getCourseType = async (
  id: number | null,
  language: string,
): Promise<CourseType | null> => {
  if (id === null) return null;
  const rawCourseType = await fetchCourseType({ language }, id);
  return adaptSingleCourseType(rawCourseType);
};

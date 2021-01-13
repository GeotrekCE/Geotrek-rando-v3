import { adaptCourseType } from './adapter';
import { fetchCourseTypes } from './api';

export const getCourseTypeFilter = async () => {
  const rawCourseTypes = await fetchCourseTypes({ language: 'fr' });
  return adaptCourseType(rawCourseTypes.results);
};

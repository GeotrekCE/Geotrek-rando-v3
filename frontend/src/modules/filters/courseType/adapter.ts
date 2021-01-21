import { Filter } from '../interface';
import { CourseType, RawCourseType } from './interface';

export const adaptCourseType = (rawCourseTypes: RawCourseType[]): Filter => ({
  id: 'courseType',
  options: rawCourseTypes.map(rawCourseType => ({
    value: `${rawCourseType.id}`,
    label: rawCourseType.route,
  })),
});

export const adaptSingleCourseType = (rawCourseType: RawCourseType): CourseType => ({
  label: rawCourseType.route,
  pictogramUri: rawCourseType.pictogram,
});

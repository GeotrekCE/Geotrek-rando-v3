import { ROUTE_ID } from '../constant';
import { FilterWithoutType } from '../interface';
import { CourseType, RawCourseType } from './interface';

export const adaptCourseType = (rawCourseTypes: RawCourseType[]): FilterWithoutType => ({
  id: ROUTE_ID,
  options: rawCourseTypes.map(rawCourseType => ({
    value: `${rawCourseType.id}`,
    label: rawCourseType.route,
  })),
});

export const adaptSingleCourseType = (rawCourseType: RawCourseType): CourseType => ({
  label: rawCourseType.route,
  pictogramUri: rawCourseType.pictogram,
});

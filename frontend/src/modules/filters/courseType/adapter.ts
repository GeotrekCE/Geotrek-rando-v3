import { Filter } from '../interface';
import { RawCourseType } from './interface';

export const adaptCourseType = (rawCourseTypes: RawCourseType[]): Filter => ({
  id: 'courseType',
  options: rawCourseTypes.map(rawCourseType => ({
    value: `${rawCourseType.id}`,
    label: rawCourseType.route,
  })),
});

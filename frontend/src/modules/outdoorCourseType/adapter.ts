import { OutdoorCourseTypeChoices, RawOutdoorCourseType } from './interface';

export const adaptOutdoorCourseType = ({
  rawOutdoorCourseType,
}: {
  rawOutdoorCourseType: RawOutdoorCourseType[];
}): OutdoorCourseTypeChoices =>
  Object.fromEntries(rawOutdoorCourseType.map(item => [item.id, item]));

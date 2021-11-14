import { OutdoorCourseTypeChoices, RawOutdoorCourseType } from './interface';

export const adaptOutdoorCourseType = ({
  rawOutdoorCourseType,
}: {
  rawOutdoorCourseType: RawOutdoorCourseType[];
}): OutdoorCourseTypeChoices =>
  rawOutdoorCourseType.reduce(
    (items, item) => ({
      ...items,
      [item.id]: item,
    }),
    {} as OutdoorCourseTypeChoices,
  );

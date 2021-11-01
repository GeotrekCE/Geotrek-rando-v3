import { OUTDOOR_ID } from '../filters/constant';
import { FilterWithoutType } from '../filters/interface';
import { OutdoorRatingChoices, RawOutdoorRating } from './interface';

export const adaptOutdoorRating = ({
  rawOutdoorRating,
}: {
  rawOutdoorRating: RawOutdoorRating[];
}): OutdoorRatingChoices =>
  rawOutdoorRating.reduce(
    (items, item) => ({
      ...items,
      [item.id]: item,
    }),
    {} as OutdoorRatingChoices,
  );

export const adaptOutdoorRatingFilter = (
  rawOutdoorRating: RawOutdoorRating[],
): FilterWithoutType => ({
  id: OUTDOOR_ID,
  options: rawOutdoorRating.map(rawOutdoorPractice => ({
    value: `${rawOutdoorPractice.id}`,
    label: rawOutdoorPractice.name,
  })),
});

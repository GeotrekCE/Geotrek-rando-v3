import { OUTDOOR_ID } from '../filters/constant';
import { FilterWithoutType } from '../filters/interface';
import {
  OutdoorRating,
  OutdoorRatingChoices,
  OutdoorRatingMapping,
  RawOutdoorRating,
} from './interface';

export const adaptOutdoorRating = ({
  rawOutdoorRating,
}: {
  rawOutdoorRating: RawOutdoorRating[];
}): OutdoorRatingChoices =>
  Object.fromEntries(rawOutdoorRating.map(item => [item.id, item]));

export const adaptOutdoorRatingFilter = (
  rawOutdoorRating: RawOutdoorRating[],
): FilterWithoutType => ({
  id: OUTDOOR_ID,
  options: rawOutdoorRating.map(rawOutdoorPractice => ({
    value: `${rawOutdoorPractice.id}`,
    label: rawOutdoorPractice.name,
  })),
});

export const adaptOutdoorRatingHashMap = (
  rawOutdoorRating: RawOutdoorRating[],
): OutdoorRatingMapping => {
  const result: Record<string, OutdoorRating[]> = {};

  rawOutdoorRating.forEach(currentOutdoorRating => {
    if (!result[currentOutdoorRating.scale]) result[currentOutdoorRating.scale] = [];
    result[currentOutdoorRating.scale].push(currentOutdoorRating);
  });

  return result;
};

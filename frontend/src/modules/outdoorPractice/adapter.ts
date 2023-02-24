import { ActivityFilter } from '../activities/interface';
import { OUTDOOR_ID } from '../filters/constant';
import { FilterWithoutType } from '../filters/interface';
import { OutdoorPracticeChoices, RawOutdoorPractice } from './interface';

export const adaptOutdoorPractices = ({
  rawOutdoorPractices,
}: {
  rawOutdoorPractices: RawOutdoorPractice[];
}): OutdoorPracticeChoices =>
  rawOutdoorPractices.reduce(
    (items, { name, id, pictogram }) => ({
      ...items,
      [id]: {
        id,
        label: name,
        pictogramUri: pictogram,
      },
    }),
    {} as OutdoorPracticeChoices,
  );

export const adaptOutdoorPracticesForActivities = (
  rawOutdoorPractices: RawOutdoorPractice[],
): ActivityFilter[] =>
  rawOutdoorPractices.map(({ name, id, pictogram, order = null }) => ({
    id,
    label: name,
    order,
    pictogramUri: pictogram,
    type: 'OUTDOOR_PRACTICE',
  }));

export const adaptOutdoorPracticesFilter = (
  rawOutdoorPractices: RawOutdoorPractice[],
): FilterWithoutType => ({
  id: OUTDOOR_ID,
  options: rawOutdoorPractices.map(rawOutdoorPractice => ({
    value: `${rawOutdoorPractice.id}`,
    label: rawOutdoorPractice.name,
    pictogramUrl: rawOutdoorPractice.pictogram,
  })),
});

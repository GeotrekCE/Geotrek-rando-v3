import { ActivityChoices } from '../activities/interface';
import { OUTDOOR_ID } from '../filters/constant';
import { FilterWithoutType } from '../filters/interface';
import { OutdoorPracticeChoices, RawOutdoorPractice } from './interface';

export const adaptOutdoorPractices = ({
  rawOutdoorPractices,
}: {
  rawOutdoorPractices: RawOutdoorPractice[];
}): OutdoorPracticeChoices =>
  rawOutdoorPractices.reduce(
    (items, { name, id }) => ({
      ...items,
      [id]: {
        id,
        name,
        // @FIXME Wait for API
        pictogram: '',
      },
    }),
    {} as OutdoorPracticeChoices,
  );

export const adaptOutdoorPracticesFilter = (
  rawOutdoorPractices: RawOutdoorPractice[],
): FilterWithoutType => ({
  id: OUTDOOR_ID,
  options: rawOutdoorPractices.map(rawOutdoorPractice => ({
    value: `${rawOutdoorPractice.id}`,
    label: rawOutdoorPractice.name,
  })),
});

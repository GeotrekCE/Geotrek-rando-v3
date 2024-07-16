import { ActivityBarLinks } from 'modules/home/interface';
import { ActivityFilter } from '../activities/interface';
import { OUTDOOR_ID } from '../filters/constant';
import { FilterWithoutType } from '../filters/interface';
import { OutdoorPracticeChoices, RawOutdoorPractice } from './interface';

export const adaptOutdoorPractices = ({
  rawOutdoorPractices,
}: {
  rawOutdoorPractices: RawOutdoorPractice[];
}): OutdoorPracticeChoices =>
  Object.fromEntries(rawOutdoorPractices.map(({ name: label, id, pictogram: pictogramUri }) => [id, { label, id, pictogramUri }]));

export const adaptOutdoorPracticesForActivities = (
  rawOutdoorPractices: RawOutdoorPractice[],
  { grouped, iconUrl }: Partial<ActivityBarLinks>,
): ActivityFilter[] => {
  if (grouped) {
    return [
      {
        label: 'Outdoor Practices',
        titleTranslationId: 'home.activityBar.outdoorPractices',
        pictogramUri: iconUrl ?? '/icons/practice-outdoor.svg',
        id: rawOutdoorPractices
          .map(({ id }) => `${id}`)
          .sort()
          .join(','),
        order: null,
        type: 'OUTDOOR_PRACTICE',
      },
    ];
  }
  return rawOutdoorPractices.map(({ name, id, pictogram, order = null }) => ({
    id,
    label: name,
    order,
    pictogramUri: pictogram,
    type: 'OUTDOOR_PRACTICE',
  }));
};

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

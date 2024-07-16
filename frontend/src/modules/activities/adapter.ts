import { PRACTICE_ID } from 'modules/filters/constant';
import { FilterWithoutType } from 'modules/filters/interface';
import { sortedByOrder } from 'modules/utils/array';
import { ActivityBarLinks } from 'modules/home/interface';
import { Activity, ActivityChoices, ActivityFilter, RawListActivity } from './interface';

const isCompleteRawListActivity = (
  rawActivity: Partial<RawListActivity>,
): rawActivity is RawListActivity =>
  rawActivity.name !== undefined &&
  rawActivity.pictogram !== undefined &&
  rawActivity.id !== undefined;

export const adaptActivityFilter = (
  rawActivities: Partial<RawListActivity>[],
): FilterWithoutType => ({
  id: PRACTICE_ID,
  options: rawActivities
    .filter(isCompleteRawListActivity)
    .sort(sortedByOrder)
    .map(rawActivity => ({
      value: `${rawActivity.id}`,
      label: rawActivity.name,
      pictogramUrl: rawActivity.pictogram,
    })),
});

export const adaptActivity = (rawActivity: RawListActivity): Activity => ({
  id: rawActivity.id,
  pictogramUri: rawActivity.pictogram,
  label: rawActivity.name,
});

export const adaptActivities = (rawActivities: Partial<RawListActivity>[]): ActivityChoices =>
  Object.fromEntries(rawActivities
    .filter(isCompleteRawListActivity)
    .sort(sortedByOrder)
    .map(
      ({ name: label, pictogram: pictogramUri, id }) => [id, { id, label, pictogramUri }]
    ))

export const adaptActivitiesFilter = (
  rawActivities: Partial<RawListActivity>[],
  { grouped, iconUrl }: Partial<ActivityBarLinks>,
): ActivityFilter[] => {
  if (grouped) {
    return [
      {
        label: 'Practices',
        titleTranslationId: 'home.activityBar.practices',
        pictogramUri: iconUrl ?? '/icons/practice-trek.svg',
        id: rawActivities
          .filter(isCompleteRawListActivity)
          .map(({ id }) => `${id}`)
          .sort()
          .join(','),
        order: null,
        type: 'PRACTICE',
      },
    ];
  }
  return rawActivities
    .filter(isCompleteRawListActivity)
    .sort(sortedByOrder)
    .map(({ name, pictogram, id, order = null }) => ({
      label: name,
      pictogramUri: pictogram,
      id: `${id}`,
      order,
      type: 'PRACTICE',
    }));
};

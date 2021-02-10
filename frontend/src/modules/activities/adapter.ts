import { PRACTICE_ID } from 'modules/filters/constant';
import { FilterWithoutType } from 'modules/filters/interface';
import { Activity, ActivityChoices, RawListActivity } from './interface';

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
  options: rawActivities.filter(isCompleteRawListActivity).map(rawActivity => ({
    value: `${rawActivity.id}`,
    label: rawActivity.name,
    pictogramUrl: rawActivity.pictogram,
  })),
});

export const adaptActivity = (rawActivity: RawListActivity): Activity => ({
  pictogram: rawActivity.pictogram,
  name: rawActivity.name,
});

export const adaptActivities = (rawActivities: Partial<RawListActivity>[]): ActivityChoices =>
  rawActivities.filter(isCompleteRawListActivity).reduce(
    (activities, { name, pictogram, id }) => ({
      ...activities,
      [id]: {
        name,
        pictogram,
      },
    }),
    {} as ActivityChoices,
  );

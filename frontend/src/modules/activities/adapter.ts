import { Filter } from 'modules/filters/interface';
import { Activity, ActivityChoices, RawListActivity } from './interface';

export const adaptActivityFilter = (rawActivities: RawListActivity[]): Filter => ({
  id: 'activity',
  options: rawActivities.map(rawActivity => ({
    value: `${rawActivity.id}`,
    label: rawActivity.name,
    pictogramUrl: rawActivity.pictogram,
  })),
});

export const adaptActivity = (rawActivity: RawListActivity): Activity => ({
  pictogram: rawActivity.pictogram,
  name: rawActivity.name,
});

export const adaptActivities = (rawActivities: RawListActivity[]): ActivityChoices =>
  rawActivities.reduce(
    (activities, currentRawActivity) => ({
      ...activities,
      [`${currentRawActivity.id}`]: {
        name: currentRawActivity.name,
        pictogram: currentRawActivity.pictogram,
      },
    }),
    {},
  );

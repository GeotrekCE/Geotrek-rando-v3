import { Filter } from 'modules/filters/interface';
import { ActivityChoices, RawListActivity } from './interface';

export const adaptActivityFilter = (rawActivities: RawListActivity[]): Filter => ({
  id: 'activity',
  options: rawActivities.map(rawActivity => ({
    value: `${rawActivity.id}`,
    label: rawActivity.name,
  })),
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

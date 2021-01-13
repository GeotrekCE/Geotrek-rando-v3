import { Filter } from 'modules/filters/interface';
import { RawListActivity } from './interface';

export const adaptActivityFilter = (rawActivities: RawListActivity[]): Filter => ({
  id: 'activity',
  options: rawActivities.map(rawActivity => ({
    value: `${rawActivity.id}`,
    label: rawActivity.name,
  })),
});

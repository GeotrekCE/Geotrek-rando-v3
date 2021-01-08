import { Activity, RawListActivity } from './interface';

export const adaptListActivity = (rawActivity: RawListActivity, language: string): Activity => {
  const rawName = rawActivity.name[language];
  let name = '';
  if (rawName !== null) {
    name = rawName;
  }
  return {
    id: rawActivity.id,
    order: rawActivity.order,
    name,
    pictogram: rawActivity.pictogram,
  };
};

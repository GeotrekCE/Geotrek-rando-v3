import { getActivities } from 'modules/activities/connector';
import { adaptResults } from './adapter';
import { fetchDetails } from './api';
import { Details } from './interface';

export const getDetails = async (id: string): Promise<Details> => {
  const [rawDetails, activities] = await Promise.all([
    fetchDetails({ language: 'fr' }, id),
    getActivities(),
  ]);
  return adaptResults({ rawDetails, activities });
};

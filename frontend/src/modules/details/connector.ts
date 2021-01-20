import { fetchActivity } from 'modules/activities/api';
import { adaptResults } from './adapter';
import { fetchDetails } from './api';
import { Details } from './interface';

export const getDetails = async (id: string): Promise<Details> => {
  const rawDetails = await fetchDetails({ language: 'fr' }, id);
  const activity = await fetchActivity({ language: 'fr' }, rawDetails.practice);
  return adaptResults({ rawDetails, activity });
};

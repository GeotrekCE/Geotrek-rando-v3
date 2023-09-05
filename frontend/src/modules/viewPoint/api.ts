import { GeotrekAPI } from 'services/api/client';
import { ViewPoint } from './interface';

export const fetchViewPointMetadata = (url: string): Promise<ViewPoint['metadata']> => {
  try {
    return GeotrekAPI.get(url).then(r => r.data);
  } catch (e) {
    console.error('Error in viewpointsMetadata/api/fetch', e);
    throw e;
  }
};

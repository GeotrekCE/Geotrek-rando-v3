import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawViewPointCategories, ViewPoint } from './interface';

export const fetchViewPointMetadata = (url: string): Promise<ViewPoint['metadata']> => {
  try {
    return GeotrekAPI.get(url).then(r => r.data);
  } catch (e) {
    console.error('Error in viewpointsMetadata/api/fetch', e);
    throw e;
  }
};

export const fetchViewPointCategories = (
  query: APIQuery,
): Promise<APIResponseForList<RawViewPointCategories>> =>
  GeotrekAPI.get('/annotation_category/', {
    params: { ...query },
  }).then(r => r.data);

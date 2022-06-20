import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawService } from './interface';

const fieldsParams = {
  fields: 'id,geometry,type',
};

export const fetchService = (query: APIQuery): Promise<APIResponseForList<RawService>> => {
  try {
    return GeotrekAPI.get('/service', { params: { ...query, ...fieldsParams } }).then(r => r.data);
  } catch (e) {
    console.error('Error in service/api/fetch', e);
    throw e;
  }
};

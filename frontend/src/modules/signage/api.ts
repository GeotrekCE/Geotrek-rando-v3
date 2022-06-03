import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawSignage } from './interface';

const fieldsParams = {
  fields: 'attachments,description,id,geometry,name,type',
};

export const fetchSignage = (query: APIQuery): Promise<APIResponseForList<RawSignage>> => {
  try {
    return GeotrekAPI.get('/signage', { params: { ...query, ...fieldsParams } }).then(r => r.data);
  } catch (e) {
    console.error('Error in signage/api/fetch', e);
    throw e;
  }
};

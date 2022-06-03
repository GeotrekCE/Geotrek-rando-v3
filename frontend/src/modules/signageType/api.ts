import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { SignageType } from './interface';

const fieldsParams = {
  fields: 'id,label,pictogram',
};

export const fetchSignageType = (query: APIQuery): Promise<APIResponseForList<SignageType>> =>
  GeotrekAPI.get('/signage_type', {
    params: { ...query, ...fieldsParams },
  }).then(r => r.data);

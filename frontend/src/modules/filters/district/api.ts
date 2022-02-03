import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawDistrict } from './interface';

const fieldsParams = {
  fields: 'name,id',
};

export const fetchDistricts = (query: APIQuery): Promise<APIResponseForList<RawDistrict>> =>
  GeotrekAPI.get('/district', { params: { ...query, ...fieldsParams } }).then(r => {
    return r.data;
  });

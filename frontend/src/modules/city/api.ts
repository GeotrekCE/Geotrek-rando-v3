import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawCity } from './interface';

const fieldsParams = {
  fields: 'id,name,code',
};

export const fetchCities = (query: APIQuery): Promise<APIResponseForList<RawCity>> =>
  GeotrekAPI.get(`/city/`, { params: { ...query, ...fieldsParams } }).then(r => r.data);

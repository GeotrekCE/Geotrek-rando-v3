import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawCity } from './interface';

const fieldsParams = {
  fields: 'name,id',
};

export const fetchCities = (query: APIQuery): Promise<APIResponseForList<RawCity>> =>
  GeotrekAPI.url('/city')
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

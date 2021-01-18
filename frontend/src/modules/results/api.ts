import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawTrekResults } from './interface';

const fieldsParams = {
  fields:
    'id,departure,name,themes,duration,length_2d,ascent,difficulty,reservation_system,thumbnail,practice',
};

export const fetchTrekResults = (query: APIQuery): Promise<RawTrekResults> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

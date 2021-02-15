import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawMapResults } from './interface';

const fieldsParams = {
  fields: 'id,parking_location,practice',
};

export const fetchTrekMapResults = (query: APIQuery): Promise<RawMapResults> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

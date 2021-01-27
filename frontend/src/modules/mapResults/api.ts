import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawMapResults } from './interface';

const fieldsParams = {
  fields: 'id,parking_location,practice',
};

export const fetchMapResults = (query: APIQuery): Promise<RawMapResults> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

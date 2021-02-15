import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawTrekMapResults } from './interface';

const fieldsParams = {
  fields: 'id,parking_location,practice',
};

export const fetchTrekMapResults = (query: APIQuery): Promise<RawTrekMapResults> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

export const fetchTouristicContentMapResults = (query: APIQuery): Promise<RawTrekMapResults> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

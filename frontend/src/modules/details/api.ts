import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawDetails } from './interface';

const fieldsParams = {
  fields: 'name,departure,thumbnail,practice,public_transport,access,advised_parking',
};

export const fetchDetails = (query: APIQuery, id: string): Promise<RawDetails> =>
  GeotrekAPI.url(`/trek/${id}/`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

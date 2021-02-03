import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawInformationDesk } from './interface';

const fieldsParams = {
  fields: 'name,street,postal_code,municipality,website,email,phone,description,type',
};

export const fetchInformationDesks = (
  query: APIQuery,
): Promise<APIResponseForList<RawInformationDesk>> =>
  GeotrekAPI.url(`/informationdesk`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

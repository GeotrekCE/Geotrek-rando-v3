import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawInformationDesk } from './interface';

const fieldsParams = {
  fields: 'id,name,street,postal_code,municipality,website,email,phone,description,type',
};

export const fetchInformationDesks = (
  query: APIQuery,
): Promise<APIResponseForList<RawInformationDesk>> => {
  try {
    return GeotrekAPI.url(`/informationdesk`)
      .query({ ...query, ...fieldsParams })
      .get()
      .json();
  } catch (e) {
    console.error('Error in informationDesk/api/fetch', e);
    throw e;
  }
};

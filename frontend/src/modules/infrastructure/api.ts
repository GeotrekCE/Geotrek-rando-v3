import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawInfrastructure } from './interface';

const fieldsParams = {
  fields: 'accessibility,attachments,description,id,geometry,name,type',
};

export const fetchInfrastructure = (
  query: APIQuery,
): Promise<APIResponseForList<RawInfrastructure>> => {
  try {
    return GeotrekAPI.get('/infrastructure', { params: { ...query, ...fieldsParams } }).then(
      r => r.data,
    );
  } catch (e) {
    console.error('Error in infrastructure/api/fetch', e);
    throw e;
  }
};

import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawFlatPage } from './interface';

const fieldsParamFlatPages = {
  field: 'id,external_url,title,order',
};

export const fetchFlatPages = (query: APIQuery): Promise<APIResponseForList<RawFlatPage>> =>
  GeotrekAPI.url(`/flatpage`)
    .query({ ...query, fieldsParamFlatPages })
    .get()
    .json();

import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawFlatPage, RawFlatPageDetails } from './interface';

// TODO filtre par portail en plus ici
const fieldsParamFlatPages = {
  field: 'id,external_url,title,order',
};

export const fetchFlatPages = (query: APIQuery): Promise<APIResponseForList<RawFlatPage>> =>
  GeotrekAPI.url(`/flatpage`)
    .query({ ...query, fieldsParamFlatPages })
    .get()
    .json();

const fieldsParamFlatPageDetails = {
  field: 'id,title,content,source',
};

export const fetchFlatPageDetails = (query: APIQuery, id: string): Promise<RawFlatPageDetails> =>
  GeotrekAPI.url(`/flatpage/${id}/`)
    .query({ ...query, fieldsParamFlatPageDetails })
    .get()
    .json();

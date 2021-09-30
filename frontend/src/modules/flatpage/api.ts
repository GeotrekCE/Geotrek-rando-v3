import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawFlatPage, RawFlatPageDetails } from './interface';

const fieldsParamFlatPages = {
  fields: 'id,external_url,title,order',
};

export const fetchFlatPages = (query: APIQuery): Promise<APIResponseForList<RawFlatPage>> =>
  GeotrekAPI.url(`/flatpage`)
    .query({ ...query, ...fieldsParamFlatPages, ...portalsFilter })
    .get()
    .json();

const fieldsParamFlatPageDetails = {
  fields: 'id,title,content,source,attachments',
};

export const fetchFlatPageDetails = (query: APIQuery, id: string): Promise<RawFlatPageDetails> =>
  GeotrekAPI.url(`/flatpage/${id}/`)
    .query({ ...query, ...fieldsParamFlatPageDetails })
    .get()
    .notFound(() => {
      throw new Error('RESSOURCE_NOT_FOUND');
    })
    .json();

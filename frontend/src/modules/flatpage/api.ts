import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawFlatPage, RawFlatPageDetails } from './interface';

const fieldsParamFlatPages = {
  fields: 'id,external_url,title,order',
};

export const fetchFlatPages = (query: APIQuery): Promise<APIResponseForList<RawFlatPage>> =>
  GeotrekAPI.get(`/flatpage/`, {
    params: { ...query, ...fieldsParamFlatPages, ...portalsFilter },
  }).then(r => r.data);

const fieldsParamFlatPageDetails = {
  fields: 'id,title,content,source,attachments',
};

export const fetchFlatPageDetails = (query: APIQuery, id: string): Promise<RawFlatPageDetails> =>
  GeotrekAPI.get(`/flatpage/${encodeURIComponent(id)}/`, {
    params: { ...query, ...fieldsParamFlatPageDetails },
  }).then(r => r.data);

export const fetchChildrenFlatPageDetails = (
  query: APIQuery,
  id: string,
): Promise<APIResponseForList<RawFlatPageDetails>> =>
  GeotrekAPI.get(`/flatpage/`, {
    params: { ...query, ...fieldsParamFlatPageDetails, parent: id },
  }).then(r => r.data);

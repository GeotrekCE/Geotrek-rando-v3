import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawPoi } from './interface';

const fieldsParams = {
  fields: 'id,name,description,attachments,type,geometry',
};

export const fetchPois = (query: APIQuery): Promise<APIResponseForList<RawPoi>> =>
  GeotrekAPI.url(`/poi`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

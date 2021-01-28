import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawActivitySuggestion } from './interface';

const fieldsParams = {
  fields: 'name,attachments',
};

export const fetchActivitySuggestions = (
  query: APIQuery,
): Promise<APIResponseForList<RawActivitySuggestion>> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

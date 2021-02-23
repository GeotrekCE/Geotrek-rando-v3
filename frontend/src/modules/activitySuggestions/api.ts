import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawActivitySuggestion } from './interface';

const fieldsParams = {
  fields: 'name,attachments,id',
};

export const fetchActivitySuggestion = (
  id: string,
  query: APIQuery,
): Promise<RawActivitySuggestion> =>
  GeotrekAPI.url(`/trek/${id}`)
    .query({ ...query, ...fieldsParams, ...portalsFilter })
    .get()
    .json();

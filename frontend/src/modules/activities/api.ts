import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawListActivity } from './interface';

export const fetchActivities = async (
  query: APIQuery,
): Promise<APIResponseForList<RawListActivity>> => {
  const apiQuery: APIQuery = {
    language: query.language,
  };
  if (query.fields !== undefined) {
    apiQuery.fields = query.fields;
  }
  if (query.omit !== undefined) {
    apiQuery.omit = query.omit;
  }
  if (query.page !== undefined) {
    apiQuery.page = query.page;
  }
  if (query.page_size !== undefined) {
    apiQuery.page_size = query.page_size;
  }
  return GeotrekAPI.url('/practice').query(apiQuery).get().json();
};

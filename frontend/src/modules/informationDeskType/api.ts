import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawInformationDeskType } from './interface';

export const fetchInformationDeskTypes = (
  query: APIQuery,
): Promise<APIResponseForList<RawInformationDeskType>> =>
  GeotrekAPI.url(`/informationdesktype`).query(query).get().json();

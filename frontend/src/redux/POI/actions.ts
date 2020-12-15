import { createAsyncAction } from 'typesafe-actions';

export const getPOIList = createAsyncAction(
  'POI/GET_POI_REQUEST',
  'POI/GET_POI_SUCCESS',
  'POI/GET_POI_FAILURE',
)<
  {
    language: string;
    page: number;
    page_size: number;
  },
  {
    results: string[];
  },
  {
    errorMessage: string;
  }
>();

export default {
  getPOIList,
};

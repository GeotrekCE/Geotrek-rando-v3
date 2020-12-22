import { createAsyncAction } from 'typesafe-actions';

import { TreksList } from '../../domain/Trek/Trek';

export const getTreksList = createAsyncAction(
  'TREK/GET_TREKS_REQUEST',
  'TREK/GET_TREKS_SUCCESS',
  'TREK/GET_TREKS_FAILURE',
)<
  {
    language: string;
    page: number;
    page_size: number;
  },
  {
    results: TreksList;
  },
  {
    errorMessage: string;
  }
>();

export default {
  getTreksList,
};

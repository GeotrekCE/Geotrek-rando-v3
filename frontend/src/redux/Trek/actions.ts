import { createAsyncAction } from 'typesafe-actions';

import { TreksList } from '../../domain/Trek/Trek';

const getTreksListServerSide = createAsyncAction(
  'TREK/SERVER/GET_TREKS_REQUEST',
  'TREK/SERVER/GET_TREKS_SUCCESS',
  'TREK/SERVER/GET_TREKS_FAILURE',
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

const getTreksListClientSide = createAsyncAction(
  'TREK/CLIENT/GET_TREKS_REQUEST',
  'TREK/CLIENT/GET_TREKS_SUCCESS',
  'TREK/CLIENT/GET_TREKS_FAILURE',
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

export const getTreksList = {
  server: getTreksListServerSide,
  client: getTreksListClientSide,
};

export default {
  getTreksList,
};

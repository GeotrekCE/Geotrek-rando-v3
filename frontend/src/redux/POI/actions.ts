import { createAsyncAction } from 'typesafe-actions';

import { POIList } from '../../domain/POI/POI';

const getPOIListServerSide = createAsyncAction(
  'POI/SERVER/GET_POI_REQUEST',
  'POI/SERVER/GET_POI_SUCCESS',
  'POI/SERVER/GET_POI_FAILURE',
)<
  {
    language: string;
    page: number;
    page_size: number;
  },
  {
    results: POIList;
  },
  {
    errorMessage: string;
  }
>();

const getPOIListClientSide = createAsyncAction(
  'POI/CLIENT/GET_POI_REQUEST',
  'POI/CLIENT/GET_POI_SUCCESS',
  'POI/CLIENT/GET_POI_FAILURE',
)<
  {
    language: string;
    page: number;
    page_size: number;
  },
  {
    results: POIList;
  },
  {
    errorMessage: string;
  }
>();

export const getPOIList = {
  server: getPOIListServerSide,
  client: getPOIListClientSide,
};

export default {
  getPOIList,
};

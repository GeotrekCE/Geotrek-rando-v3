import { ActionType, getType } from 'typesafe-actions';
import { AnyAction } from 'redux';

import { hydrate } from '../actions';
import { getPOIList } from './actions';

import { POIList } from '../../domain/POI/POI';

export type POIAction = ActionType<
  | typeof getPOIList.server.request
  | typeof getPOIList.server.success
  | typeof getPOIList.server.failure
  | typeof getPOIList.client.request
  | typeof getPOIList.client.success
  | typeof getPOIList.client.failure
  | typeof hydrate
>;

export type POIState = Readonly<{
  server: {
    POIList: POIList | null;
    getPOIListError: string | null;
  };
  client: {
    POIList: POIList | null;
    getPOIListError: string | null;
  };
}>;

export const initialState: POIState = {
  server: { POIList: null, getPOIListError: null },
  client: { POIList: null, getPOIListError: null },
};

const reducer = (state: POIState = initialState, action: AnyAction): POIState => {
  const typedAction = action as POIAction;
  switch (typedAction.type) {
    case getType(hydrate):
      return {
        ...state,
        server: {
          ...state.server,
          ...typedAction.payload.POI.server,
        },
      };
    case getType(getPOIList.server.request):
      return {
        ...state,
        server: {
          ...state.server,
          getPOIListError: null,
        },
      };
    case getType(getPOIList.server.success):
      return {
        ...state,
        server: {
          ...state.server,
          POIList: typedAction.payload.results,
          getPOIListError: null,
        },
      };
    case getType(getPOIList.server.failure):
      return {
        ...state,
        server: {
          ...state.server,
          getPOIListError: typedAction.payload.errorMessage,
        },
      };
    case getType(getPOIList.client.request):
      return {
        ...state,
        client: {
          ...state.client,
          getPOIListError: null,
        },
      };
    case getType(getPOIList.client.success):
      return {
        ...state,
        client: {
          ...state.client,
          POIList: typedAction.payload.results,
          getPOIListError: null,
        },
      };
    case getType(getPOIList.client.failure):
      return {
        ...state,
        client: {
          ...state.client,
          getPOIListError: typedAction.payload.errorMessage,
        },
      };
    default:
      return state;
  }
};

export default reducer;

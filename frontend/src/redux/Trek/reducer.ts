import { ActionType, getType } from 'typesafe-actions';
import { AnyAction } from 'redux';

import { hydrate } from '../actions';
import { getTreksList } from './actions';

import { TreksList } from '../../domain/Trek/Trek';

export type TrekAction = ActionType<
  | typeof getTreksList.server.request
  | typeof getTreksList.server.success
  | typeof getTreksList.server.failure
  | typeof getTreksList.client.request
  | typeof getTreksList.client.success
  | typeof getTreksList.client.failure
  | typeof hydrate
>;

export type TrekState = Readonly<{
  server: {
    treksList: TreksList | null;
    getTreksListError: string | null;
  };
  client: {
    treksList: TreksList | null;
    getTreksListError: string | null;
  };
}>;

export const initialState: TrekState = {
  server: { treksList: null, getTreksListError: null },
  client: { treksList: null, getTreksListError: null },
};

const reducer = (state: TrekState = initialState, action: AnyAction): TrekState => {
  const typedAction = action as TrekAction;
  switch (typedAction.type) {
    case getType(hydrate):
      return {
        ...state,
        server: {
          ...state.server,
          ...typedAction.payload.Trek.server,
        },
      };
    case getType(getTreksList.server.request):
      return {
        ...state,
        server: {
          ...state.server,
          getTreksListError: null,
        },
      };
    case getType(getTreksList.server.success):
      return {
        ...state,
        server: {
          treksList: typedAction.payload.results,
          getTreksListError: null,
        },
      };
    case getType(getTreksList.server.failure):
      return {
        ...state,
        server: {
          ...state.server,
          getTreksListError: typedAction.payload.errorMessage,
        },
      };
    case getType(getTreksList.client.request):
      return {
        ...state,
        client: {
          ...state.client,
          getTreksListError: null,
        },
      };
    case getType(getTreksList.client.success):
      return {
        ...state,
        client: {
          treksList: typedAction.payload.results,
          getTreksListError: null,
        },
      };
    case getType(getTreksList.client.failure):
      return {
        ...state,
        client: {
          ...state.client,
          getTreksListError: typedAction.payload.errorMessage,
        },
      };
    default:
      return state;
  }
};

export default reducer;

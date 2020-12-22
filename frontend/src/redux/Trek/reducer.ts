import { ActionType, getType } from 'typesafe-actions';
import { AnyAction } from 'redux';

import { hydrate } from '../actions';
import { getTreksList } from './actions';

import { TreksList } from '../../domain/Trek/Trek';

export type TrekAction = ActionType<
  | typeof getTreksList.request
  | typeof getTreksList.success
  | typeof getTreksList.failure
  | typeof hydrate
>;

export type TrekState = Readonly<{
  TreksList?: TreksList | null;
  getTreksListError: string | null;
}>;

export const initialState: TrekState = { TreksList: null, getTreksListError: null };

const reducer = (state: TrekState = initialState, action: AnyAction): TrekState => {
  const typedAction = action as TrekAction;
  switch (typedAction.type) {
    case getType(getTreksList.request):
      return {
        ...state,
        getTreksListError: null,
      };
    case getType(getTreksList.success):
      return {
        ...state,
        TreksList: typedAction.payload.results,
        getTreksListError: null,
      };
    case getType(getTreksList.failure):
      return {
        ...state,
        getTreksListError: typedAction.payload.errorMessage,
      };
    case getType(hydrate):
      return { ...state, ...typedAction.payload.Trek };
    default:
      return state;
  }
};

export default reducer;

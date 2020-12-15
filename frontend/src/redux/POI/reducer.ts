import { ActionType, getType } from 'typesafe-actions';
import { AnyAction } from 'redux';

import { hydrate } from '../actions';
import { getPOIList } from './actions';

export type POIAction = ActionType<
  typeof getPOIList.request | typeof getPOIList.success | typeof getPOIList.failure | typeof hydrate
>;

export type POIState = Readonly<{
  POIList: string[] | null;
  getPOIListError: string | null;
}>;

export const initialState: POIState = { POIList: null, getPOIListError: null };

const reducer = (state: POIState = initialState, action: AnyAction): POIState => {
  const typedAction = action as POIAction;
  switch (typedAction.type) {
    case getType(getPOIList.request):
      return {
        ...state,
        getPOIListError: null,
      };
    case getType(getPOIList.success):
      return {
        ...state,
        POIList: typedAction.payload.results,
        getPOIListError: null,
      };
    case getType(getPOIList.failure):
      return {
        ...state,
        getPOIListError: typedAction.payload.errorMessage,
      };
    case getType(hydrate):
      return { ...state, ...typedAction.payload.POI };
    default:
      return state;
  }
};

export default reducer;

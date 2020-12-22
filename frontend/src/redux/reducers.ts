import { combineReducers, Reducer } from 'redux';

import { initialState as POIInitialState, reducer as POIReducer } from './POI';
import { initialState as TrekInitialState, reducer as TrekReducer } from './Trek';
import { RootState } from './types';

/**
 * Example of the module which should export a reducer.
 */

/**
 * Creates the main reducer with the asynchronously loaded ones
 */

export const rootInitialState: RootState = {
  POI: POIInitialState,
  Trek: TrekInitialState,
};

const rootReducers: Reducer<RootState> = combineReducers({
  POI: POIReducer,
  Trek: TrekReducer,
});

export default rootReducers;

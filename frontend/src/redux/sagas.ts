import { all } from 'redux-saga/effects';

import { sagas as POISagas } from './POI';
import { sagas as TrekSagas } from './Trek';

// single entry point to start all Sagas at once
export default function* rootSagas() {
  yield all([POISagas(), TrekSagas()]);
}

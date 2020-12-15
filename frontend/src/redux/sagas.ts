import { all } from 'redux-saga/effects';

import { sagas as POIsagas } from './POI';

// single entry point to start all Sagas at once
export default function* rootSagas() {
  yield all([POIsagas()]);
}

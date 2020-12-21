import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { getPOIList } from 'services/api/POI/getPOIList';
import { getPOIList as getPOIListAction } from './actions';

export function* getPOIListSaga(action: ActionType<typeof getPOIListAction.request>) {
  try {
    // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment
    const POIList: string[] = yield call(getPOIList, action.payload);
    yield put(getPOIListAction.success({ results: POIList }));
  } catch (error: unknown) {
    let errorMessage = `Error: ${String(error)}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(getPOIListAction.failure({ errorMessage }));
  }
}

export default function* POISagas() {
  yield takeEvery(getType(getPOIListAction.request), getPOIListSaga);
}

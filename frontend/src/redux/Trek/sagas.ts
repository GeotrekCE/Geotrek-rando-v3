import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { getTreksList } from 'services/api/Trek/getTreksList';
import { getTreksList as getTreksListAction } from './actions';
import { TreksList as TreksListType } from '../../domain/Trek/Trek';

export function* getTreksListSaga(action: ActionType<typeof getTreksListAction.request>) {
  try {
    // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment
    const TreksList: TreksListType = yield call(getTreksList, action.payload);
    yield put(getTreksListAction.success({ results: TreksList }));
  } catch (error: unknown) {
    let errorMessage = `Error: ${String(error)}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(getTreksListAction.failure({ errorMessage }));
  }
}

export default function* TrekSagas() {
  yield takeEvery(getType(getTreksListAction.request), getTreksListSaga);
}

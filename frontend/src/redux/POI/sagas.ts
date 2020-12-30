import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { getPOIList } from 'services/api/POI/getPOIList';
import { getPOIList as getPOIListAction } from './actions';
import { POIList as POIListType } from '../../domain/POI/POI';

export function* getPOIListSagaServerSide(
  action: ActionType<typeof getPOIListAction.server.request>,
) {
  try {
    // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment
    const POIList: POIListType = yield call(getPOIList, action.payload);
    yield put(getPOIListAction.server.success({ results: POIList }));
  } catch (error: unknown) {
    let errorMessage = `Error: ${String(error)}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(getPOIListAction.server.failure({ errorMessage }));
  }
}

export function* getPOIListSagaClientSide(
  action: ActionType<typeof getPOIListAction.client.request>,
) {
  try {
    // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment
    const POIList: POIListType = yield call(getPOIList, action.payload);
    yield put(getPOIListAction.client.success({ results: POIList }));
  } catch (error: unknown) {
    let errorMessage = `Error: ${String(error)}`;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(getPOIListAction.client.failure({ errorMessage }));
  }
}

export default function* POISagas() {
  yield takeEvery(getType(getPOIListAction.server.request), getPOIListSagaServerSide);
  yield takeEvery(getType(getPOIListAction.client.request), getPOIListSagaClientSide);
}

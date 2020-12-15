import { HYDRATE } from 'next-redux-wrapper';
import { createAction } from 'typesafe-actions';
import { RootState } from './types';

export const hydrate = createAction(HYDRATE)<RootState>();

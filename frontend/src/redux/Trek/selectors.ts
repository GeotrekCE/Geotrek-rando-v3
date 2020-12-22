import { RootState } from 'redux/types';
import { TreksList } from '../../domain/Trek/Trek';

export const selectTreksList = (store: RootState): TreksList | null | undefined =>
  store.Trek.TreksList;

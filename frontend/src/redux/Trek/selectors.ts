import { RootState } from 'redux/types';
import { TreksList } from '../../domain/Trek/Trek';

export const selectTreksList = (store: RootState): TreksList | null =>
  store.Trek.client.treksList ? store.Trek.client.treksList : store.Trek.server.treksList;

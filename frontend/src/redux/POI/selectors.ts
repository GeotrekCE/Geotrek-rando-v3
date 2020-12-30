import { RootState } from 'redux/types';
import { POIList } from '../../domain/POI/POI';

export const selectPOIList = (store: RootState): POIList | null => {
  return store.POI.client.POIList ? store.POI.client.POIList : store.POI.server.POIList;
};

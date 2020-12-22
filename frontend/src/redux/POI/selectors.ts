import { RootState } from 'redux/types';
import { POIList } from '../../domain/POI/POI';

export const selectPOIList = (store: RootState): POIList | null | undefined => store.POI.POIList;

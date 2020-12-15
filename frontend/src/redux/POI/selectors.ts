import { RootState } from 'redux/types';

export const selectPOIList = (store: RootState): any => store.POI.POIList;

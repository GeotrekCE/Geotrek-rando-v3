import { POIAction, POIState } from './POI';

export type RootState = Readonly<{
  POI: POIState;
}>;
export type RootAction = POIAction;

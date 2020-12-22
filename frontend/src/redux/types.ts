import { POIAction, POIState } from './POI';
import { TrekState } from './Trek';

export type RootState = Readonly<{
  POI: POIState;
  Trek: TrekState;
}>;
export type RootAction = POIAction;

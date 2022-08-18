import { OutdoorSite } from 'modules/outdoorSite/interface';
import { TrekResult } from 'modules/results/interface';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { TouristicEvent } from 'modules/touristicEvent/interface';

export interface ActivitySuggestion {
  type: 'events' | 'trek' | 'service' | 'outdoor';
  results: (TouristicContentDetails[] | TrekResult[] | OutdoorSite[] | TouristicEvent[])[];
  titleTranslationId: string;
  iconUrl: string;
  ids: string[];
}

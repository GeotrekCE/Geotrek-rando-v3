import { OutdoorSiteResult } from 'modules/outdoorSite/interface';
import { TrekResult } from 'modules/results/interface';
import { TouristicContentResult } from 'modules/touristicContent/interface';
import { TouristicEventResult } from 'modules/touristicEvent/interface';

export interface ActivitySuggestion {
  type: 'events' | 'trek' | 'service' | 'outdoor';
  results: TouristicContentResult[] | TrekResult[] | OutdoorSiteResult[] | TouristicEventResult[];
  titleTranslationId: string;
  iconUrl: string;
  ids: string[];
}

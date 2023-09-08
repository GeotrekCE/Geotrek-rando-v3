import { OutdoorPracticeChoices } from 'modules/outdoorPractice/interface';
import { OutdoorRatingMapping } from 'modules/outdoorRating/interface';
import { OutdoorRatingScale } from 'modules/outdoorRatingScale/interface';
import { getTouristicContentCategoryHashMap } from 'modules/touristicContentCategory/connector';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { ParsedUrlQuery } from 'querystring';
import { getOutdoorPractices } from '../outdoorPractice/connector';
import { getOutdoorRatingHashMap } from '../outdoorRating/connector';
import { getOutdoorRatingScale } from '../outdoorRatingScale/connector';
import { FilterState, FilterWithoutType } from './interface';
import { getFiltersState, getInitialFiltersStateWithSelectedOptions } from './utils';
import { getOrganizerFilter } from './organizer/connector';

export const getInitialFilters = async (
  language: string,
  initialOptions: ParsedUrlQuery,
): Promise<{
  initialFiltersState: FilterState[];
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
  outdoorRatingMapping: OutdoorRatingMapping;
  outdoorRatingScale: OutdoorRatingScale[];
  outdoorPractice: OutdoorPracticeChoices;
  initialFiltersStateWithSelectedOptions: FilterState[];
  organizerEvent: FilterWithoutType | null;
}> => {
  const initialFiltersState = await getFiltersState(language);
  const touristicContentCategoryMapping = await getTouristicContentCategoryHashMap(language);
  const outdoorRatingMapping = await getOutdoorRatingHashMap(language);
  const outdoorRatingScale = await getOutdoorRatingScale(language);
  const outdoorPractice = await getOutdoorPractices(language);
  const organizerEvent = await getOrganizerFilter(language);

  const initialFiltersStateWithSelectedOptions = getInitialFiltersStateWithSelectedOptions({
    initialFiltersState,
    initialOptions,
    touristicContentCategoryMapping,
    outdoorRatingMapping,
    outdoorRatingScale,
    outdoorPractice,
    organizerEvent,
  });

  return {
    initialFiltersState,
    touristicContentCategoryMapping,
    outdoorRatingMapping,
    outdoorRatingScale,
    outdoorPractice,
    initialFiltersStateWithSelectedOptions,
    organizerEvent,
  };
};

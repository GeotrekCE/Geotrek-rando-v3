import { ActivityChoices } from 'modules/activities/interface';
import { DifficultyChoices } from 'modules/filters/difficulties/interface';
import { Choices } from 'modules/filters/interface';
import { adaptTouristicContent } from 'modules/touristicContent/adapter';
import { RawTouristicContent, TouristicContent } from 'modules/touristicContent/interface';
import {
  TouristicContentCategory,
  TouristicContentCategoryDictionnary,
} from 'modules/touristicContentCategory/interface';
import { getThumbnail } from 'modules/utils/adapter';
import { formatHours } from 'modules/utils/time';
import { APIResponseForList } from 'services/api/interface';
import { RawTrekResult, RawTrekResults, TrekResult, SearchResults } from './interface';
import { extractNextPageId, formatDistance } from './utils';

export const dataUnits = {
  distance: 'm',
  time: 'h',
};

const fallbackImgUri = 'https://upload.wikimedia.org/wikipedia/fr/d/df/Logo_ecrins.png';

const isRawTrekResultComplete = (
  rawTrekResult: Partial<RawTrekResult>,
): rawTrekResult is RawTrekResult =>
  rawTrekResult.ascent !== undefined &&
  rawTrekResult.attachments !== undefined &&
  rawTrekResult.departure !== undefined &&
  rawTrekResult.difficulty !== undefined &&
  rawTrekResult.duration !== undefined &&
  rawTrekResult.id !== undefined &&
  rawTrekResult.length_2d !== undefined &&
  rawTrekResult.name !== undefined &&
  rawTrekResult.practice !== undefined &&
  rawTrekResult.reservation_system !== undefined &&
  rawTrekResult.themes !== undefined;

export const adaptTrekResultList = ({
  resultsList,
  difficulties,
  themes,
  activities,
}: {
  resultsList: Partial<RawTrekResult>[];
  difficulties: DifficultyChoices;
  themes: Choices;
  activities: ActivityChoices;
}): TrekResult[] =>
  resultsList.filter(isRawTrekResultComplete).map(rawResult => ({
    type: 'TREK',
    id: rawResult.id,
    activityIcon: 'TODO',
    place: rawResult.departure,
    title: rawResult.name,
    tags: rawResult.themes.map(themeId => themes[themeId].label),
    thumbnailUri: getThumbnail(rawResult.attachments) ?? fallbackImgUri,
    practice: activities[rawResult.practice],
    informations: {
      duration: rawResult.duration !== null ? formatHours(rawResult.duration) : null,
      distance: `${formatDistance(rawResult.length_2d)}`,
      elevation: `+${rawResult.ascent}${dataUnits.distance}`,
      difficulty:
        rawResult.difficulty !== null
          ? {
              label: difficulties[rawResult.difficulty].label,
              pictogramUri: difficulties[rawResult.difficulty].pictogramUri,
            }
          : null,
      reservationSystem: rawResult.reservation_system,
    },
  }));

export const adaptSearchResults = ({
  rawTrekResults,
  difficulties,
  themes,
  activities,
  rawTouristicContents,
  touristicContentCategories,
}: {
  rawTrekResults: APIResponseForList<Partial<RawTrekResult>>;
  difficulties: DifficultyChoices;
  themes: Choices;
  activities: ActivityChoices;
  rawTouristicContents: APIResponseForList<RawTouristicContent>;
  touristicContentCategories: TouristicContentCategoryDictionnary;
}): SearchResults => {
  const resultsList = rawTrekResults.results;
  const adaptedResultsList: TrekResult[] = adaptTrekResultList({
    resultsList,
    difficulties,
    themes,
    activities,
  });

  const adaptedTouristicContentsList: TouristicContent[] = adaptTouristicContent({
    rawTouristicContent: rawTouristicContents.results,
    touristicContentCategories,
  });

  let count = 0;
  if (rawTrekResults.count) {
    count += rawTrekResults.count;
  }
  if (rawTouristicContents.count) {
    count += rawTouristicContents.count;
  }

  return {
    resultsNumber: count,
    nextPages: {
      treks: extractNextPageId(rawTrekResults.next),
      touristicContents: extractNextPageId(rawTouristicContents.next),
    },
    results: [...adaptedResultsList, ...adaptedTouristicContentsList],
  };
};

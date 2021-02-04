import { ActivityChoices } from 'modules/activities/interface';
import { DifficultyChoices } from 'modules/filters/difficulties/interface';
import { Choices } from 'modules/filters/interface';
import { getThumbnail } from 'modules/utils/adapter';
import { formatHours } from 'modules/utils/time';
import { RawTrekResult, RawTrekResults, TrekResult, TrekResults } from './interface';
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
  resultsList: RawTrekResult[];
  difficulties: DifficultyChoices;
  themes: Choices;
  activities: ActivityChoices;
}): TrekResult[] =>
  resultsList.filter(isRawTrekResultComplete).map(rawResult => ({
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

export const adaptTrekResults = ({
  rawTrekResults,
  difficulties,
  themes,
  activities,
}: {
  rawTrekResults: RawTrekResults;
  difficulties: DifficultyChoices;
  themes: Choices;
  activities: ActivityChoices;
}): TrekResults => {
  const resultsList = rawTrekResults.results;
  const adaptedResultsList: TrekResult[] = adaptTrekResultList({
    resultsList,
    difficulties,
    themes,
    activities,
  });

  return {
    resultsNumber: rawTrekResults.count || 0,
    nextPageId: extractNextPageId(rawTrekResults.next),
    results: adaptedResultsList,
  };
};

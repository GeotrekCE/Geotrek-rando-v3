import { ActivityChoices } from 'modules/activities/interface';
import { DifficultyChoices } from 'modules/filters/difficulties/interface';
import { Choices } from 'modules/filters/interface';
import { getThumbnail } from 'modules/utils/adapter';
import { formatHours } from 'modules/utils/time';
import { RawTrekResults, TrekResult, TrekResults } from './interface';
import { extractNextPageId, formatDistance } from './utils';

export const dataUnits = {
  distance: 'm',
  time: 'h',
};

const fallbackImgUri = 'https://upload.wikimedia.org/wikipedia/fr/d/df/Logo_ecrins.png';

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
  const adaptedResultsList: TrekResult[] = resultsList.map(rawResult => ({
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

  return {
    resultsNumber: rawTrekResults.count,
    nextPageId: extractNextPageId(rawTrekResults.next),
    results: adaptedResultsList,
  };
};

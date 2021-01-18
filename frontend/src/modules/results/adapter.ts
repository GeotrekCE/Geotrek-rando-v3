import { ActivityChoices } from 'modules/activities/interface';
import { DifficultyChoices } from 'modules/filters/difficulties/interface';
import { Choices } from 'modules/filters/interface';
import { RawTrekResults, TrekResults } from './interface';
import { formatDistance } from './utils';

const dataUnits = {
  distance: 'm',
  time: 'h',
};

const fallbackImgUri =
  'https://www.ecrins-parcnational.fr/sites/ecrins-parcnational.com/themes/ecrinparcnational/logo.png';

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
  const adaptedResultsList = resultsList.map(rawResult => ({
    id: rawResult.id,
    activityIcon: 'TODO',
    place: rawResult.departure,
    title: rawResult.name,
    tags: rawResult.themes.map(themeId => themes[themeId].label),
    thumbnailUri: rawResult?.thumbnail?.url || fallbackImgUri,
    practice: activities[rawResult.practice],
    informations: {
      duration: rawResult.duration !== null ? `${rawResult.duration}${dataUnits.time}` : null,
      distance: `${formatDistance(rawResult.length_2d)}`,
      elevation: `${rawResult.ascent}${dataUnits.distance}`,
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
    results: adaptedResultsList,
  };
};

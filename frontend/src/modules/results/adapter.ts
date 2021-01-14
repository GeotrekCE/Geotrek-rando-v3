import { Choices } from 'modules/filters/interface';
import { RawTrekResults, TrekResults } from './interface';
import { formatDistance } from './utils';

const dataUnits = {
  distance: 'm',
  time: 'h',
};

export const adaptTrekResults = ({
  rawTrekResults,
  difficulties,
  themes,
}: {
  rawTrekResults: RawTrekResults;
  difficulties: Choices;
  themes: Choices;
}): TrekResults => {
  const resultsList = rawTrekResults.results;
  const adaptedResultsList = resultsList.map(rawResult => ({
    activityIcon: 'TODO',
    place: rawResult.departure,
    title: rawResult.name,
    tags: rawResult.themes.map(themeId => themes[themeId].label),
    informations: {
      duration: rawResult.duration !== null ? `${rawResult.duration}${dataUnits.time}` : null,
      distance: `${formatDistance(rawResult.length_2d)}`,
      elevation: `${rawResult.ascent}${dataUnits.distance}`,
      difficulty: rawResult.difficulty !== null ? difficulties[rawResult.difficulty].label : null,
      reservationSystem: rawResult.reservation_system,
    },
  }));

  return {
    resultsNumber: rawTrekResults.count,
    results: adaptedResultsList,
  };
};

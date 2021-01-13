import { Choices } from 'modules/filters/interface';
import { RawTrekResults, TrekResults } from './interface';

const dataUnits = {
  distance: 'm',
  time: 'h',
};

export const adaptTrekResults = ({
  rawTrekResults,
  difficulties,
  tags,
}: {
  rawTrekResults: RawTrekResults;
  difficulties: Choices;
  tags: Choices;
}): TrekResults => {
  const resultsList = rawTrekResults.results;
  const adaptedResultsList = resultsList.map(rawResult => ({
    activityIcon: 'TODO',
    place: rawResult.departure,
    title: rawResult.name,
    tags: rawResult.labels.map(label => tags[label].label),
    informations: {
      duration: rawResult.duration !== null ? `${rawResult.duration}${dataUnits.time}` : null,
      distance: `${rawResult.length_2d}${dataUnits.distance}`,
      elevation: `${rawResult.ascent}${dataUnits.distance}`,
      difficulty: rawResult.difficulty !== null ? difficulties[rawResult.difficulty].label : null,
    },
  }));

  return {
    resultsNumber: rawTrekResults.count,
    results: adaptedResultsList,
  };
};

import { Choices } from 'modules/filters/interface';
import { RawTrekResults, TrekResults } from './interface';

export const adaptTrekResults = ({
  rawTrekResults,
  difficulties,
}: {
  rawTrekResults: RawTrekResults;
  difficulties: Choices;
}): TrekResults => {
  const resultsList = rawTrekResults.results;
  const adaptedResultsList = resultsList.map(rawResult => ({
    activityIcon: 'TODO',
    place: rawResult.departure,
    title: rawResult.name,
    tags: rawResult.labels,
    informations: {
      duration: rawResult.duration,
      distance: rawResult.length_2d,
      elevation: rawResult.ascent,
      difficulty: rawResult.difficulty !== null ? difficulties[rawResult.difficulty].label : null,
    },
  }));

  return {
    resultsNumber: rawTrekResults.count,
    results: adaptedResultsList,
  };
};

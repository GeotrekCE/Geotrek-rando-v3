import { getActivities } from 'modules/activities/connector';
import { getCities } from 'modules/city/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { getOutdoorPractices } from 'modules/outdoorPractice/connector';
import { adaptOutdoorSites } from 'modules/outdoorSite/adapter';
import { fetchOutdoorSiteDetails } from 'modules/outdoorSite/api';
import { OutdoorSite, RawOutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { adaptTrekResultList } from 'modules/results/adapter';
import { fetchTrekResult } from 'modules/results/api';
import { RawTrekResult, TrekResult } from 'modules/results/interface';
import { getSources } from 'modules/source/connector';
import { adaptTouristicContentDetails } from 'modules/touristicContent/adapter';
import { fetchTouristicContentDetails } from 'modules/touristicContent/api';
import {
  RawTouristicContentDetails,
  TouristicContentDetails,
} from 'modules/touristicContent/interface';
import { getTouristicContentCategory } from 'modules/touristicContentCategory/connector';
import { adaptTouristicEvents } from 'modules/touristicEvent/adapter';
import { fetchTouristicEventDetails } from 'modules/touristicEvent/api';
import { RawTouristicEventDetails, TouristicEvent } from 'modules/touristicEvent/interface';
import { getTouristicEventTypes } from 'modules/touristicEventType/connector';
import { Suggestion } from '../home/interface';
import { ActivitySuggestion } from './interface';
export const getActivitySuggestions = async (
  suggestions: Suggestion[],
  language: string,
): Promise<ActivitySuggestion[]> => {
  const [
    difficulties,
    themes,
    activities,
    cityDictionnary,
    outdoorPracticeDictionnary,
    touristicEventType,
    sources,
  ] = await Promise.all([
    getDifficulties(language),
    getThemes(language),
    getActivities(language),
    getCities(language),
    getOutdoorPractices(language),
    getTouristicEventTypes(language),
    getSources(language),
  ]);

  const adapt = (type: Suggestion['type']) => {
    const doAdaptTrekResultList = (results: Partial<RawTrekResult>[]): TrekResult[] =>
      adaptTrekResultList({
        resultsList: results,
        difficulties,
        themes,
        activities,
        cityDictionnary,
      });
    const doAdaptTouristicContentResult = async (
      results: RawTouristicContentDetails[],
    ): Promise<TouristicContentDetails[]> => {
      return Promise.all(
        results.map(async (result: RawTouristicContentDetails) => {
          const touristicContentCategory = await getTouristicContentCategory(
            result.properties.category,
            language,
          );
          return adaptTouristicContentDetails({
            rawTCD: result,
            touristicContentCategory,
            sourceDictionnary: sources,
            cityDictionnary,
            themeDictionnary: themes,
          });
        }),
      );
    };
    const doAdaptOutdoorSites = (results: RawOutdoorSiteDetails[]): OutdoorSite[] =>
      adaptOutdoorSites({
        rawOutdoorSites: results.map(
          ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons outdoorSites attributes are in properties field
        ),
        themeDictionnary: themes,
        outdoorPracticeDictionnary,
        cityDictionnary,
      });
    const doAdaptTouristicEvents = (results: RawTouristicEventDetails[]): TouristicEvent[] =>
      adaptTouristicEvents({
        rawTouristicEvents: results.map(
          ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
        ),
        themeDictionnary: themes,
        cityDictionnary,
        touristicEventType,
      });

    return {
      trek: doAdaptTrekResultList,
      service: doAdaptTouristicContentResult,
      outdoor: doAdaptOutdoorSites,
      events: doAdaptTouristicEvents,
    }[type];
  };

  const activitySuggestions = await Promise.all(
    suggestions.map(async ({ type = 'trek', ids, ...suggestion }) => {
      const raw = (
        await Promise.all(ids.map(id => fetch(id, type, language).catch(() => null) as any))
      ).filter(Boolean);

      // TS doesn't see the correspondence between `type` and `raw`
      const results = raw.length === 0 ? [] : await adapt(type)(raw);
      return {
        ...suggestion,
        type,
        ids,
        results,
      };
    }),
  );
  return activitySuggestions as unknown as ActivitySuggestion[];
};

const fetch = (id: string, type: Suggestion['type'], language: string) => {
  const fetchWithType = {
    trek: fetchTrekResult,
    service: fetchTouristicContentDetails,
    outdoor: fetchOutdoorSiteDetails,
    events: fetchTouristicEventDetails,
  };

  const doFetch = fetchWithType[type];

  return doFetch(
    {
      language,
      fields: [
        'approved',
        'ascent',
        'attachments',
        'begin_date',
        'category',
        'cities',
        'contact',
        'departure_city',
        'departure',
        'description_teaser',
        'description',
        'difficulty',
        'duration',
        'email',
        'end_date',
        'geometry',
        'id',
        'length_2d',
        'name',
        'orientation',
        'pdf',
        'period',
        'practice',
        'reservation_system',
        'source',
        'themes',
        'type',
        'types',
        'website',
        'wind',
      ].join(','),
    },
    id,
  );
};

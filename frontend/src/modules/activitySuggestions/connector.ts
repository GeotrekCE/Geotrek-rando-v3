import { getActivities } from 'modules/activities/connector';
import { getCities } from 'modules/city/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { getOutdoorPractices } from 'modules/outdoorPractice/connector';
import { adaptoutdoorSitesResult } from 'modules/outdoorSite/adapter';
import { fetchOutdoorSiteDetails } from 'modules/outdoorSite/api';
import { OutdoorSiteResult, RawOutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { adaptTrekResultList } from 'modules/results/adapter';
import { fetchTrekResult } from 'modules/results/api';
import { RawTrekResult, TrekResult } from 'modules/results/interface';
import { adaptTouristicContentResult } from 'modules/touristicContent/adapter';
import { fetchTouristicContentDetails } from 'modules/touristicContent/api';
import {
  RawTouristicContentDetails,
  TouristicContentResult,
} from 'modules/touristicContent/interface';
import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { adaptTouristicEventsResult } from 'modules/touristicEvent/adapter';
import { fetchTouristicEventDetails } from 'modules/touristicEvent/api';
import { RawTouristicEventDetails, TouristicEventResult } from 'modules/touristicEvent/interface';
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
    touristicContentCategories,
    outdoorPracticeDictionnary,
    touristicEventType,
  ] = await Promise.all([
    getDifficulties(language),
    getThemes(language),
    getActivities(language),
    getCities(language),
    getTouristicContentCategories(language),
    getOutdoorPractices(language),
    getTouristicEventTypes(language),
  ]);

  const adapt = (type: Suggestion['type']) => {
    const doAdaptTrekResultList = (results: RawTrekResult[]): TrekResult[] =>
      adaptTrekResultList({
        resultsList: results,
        difficulties,
        themes,
        activities,
        cityDictionnary,
      });
    const doAdaptTouristicContentResult = (
      results: RawTouristicContentDetails[],
    ): TouristicContentResult[] =>
      adaptTouristicContentResult({
        rawTouristicContent: results.map(
          ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
        ),
        touristicContentCategories,
        themeDictionnary: themes,
        cityDictionnary,
      });
    const doAdaptOutdoorSites = (results: RawOutdoorSiteDetails[]): OutdoorSiteResult[] =>
      adaptoutdoorSitesResult({
        rawOutdoorSites: results.map(
          ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
        ),
        themeDictionnary: themes,
        outdoorPracticeDictionnary,
        cityDictionnary,
      });
    const doAdaptTouristicEvents = (results: RawTouristicEventDetails[]): TouristicEventResult[] =>
      adaptTouristicEventsResult({
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
      const results = raw.length === 0 ? [] : adapt(type)(raw);
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
    },
    id,
  );
};

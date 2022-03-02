import { getActivities } from 'modules/activities/connector';
import { getCities } from 'modules/city/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { getOutdoorPractices } from 'modules/outdoorPractice/connector';
import { adaptOutdoorSites } from 'modules/outdoorSite/adapter';
import { fetchOutdoorSiteDetails } from 'modules/outdoorSite/api';
import { OutdoorSite } from 'modules/outdoorSite/interface';
import { adaptTrekResultList } from 'modules/results/adapter';
import { fetchTrekResult } from 'modules/results/api';
import { TrekResult } from 'modules/results/interface';
import { getSources } from 'modules/source/connector';
import { adaptTouristicContentDetails } from 'modules/touristicContent/adapter';
import { fetchTouristicContentDetails } from 'modules/touristicContent/api';
import {
  TouristicContentDetails,
  TouristicContentResult,
} from 'modules/touristicContent/interface';
import { getTouristicContentCategory } from 'modules/touristicContentCategory/connector';
import { adaptTouristicEvents } from 'modules/touristicEvent/adapter';
import { fetchTouristicEventDetails } from 'modules/touristicEvent/api';
import { TouristicEvent } from 'modules/touristicEvent/interface';
import { getTouristicEventTypes } from 'modules/touristicEventType/connector';
import { Suggestion } from '../home/interface';

export type Result = TrekResult | TouristicContentResult | OutdoorSite | TouristicEvent;

export const getActivitySuggestions = async (suggestions: Suggestion[], language: string) => {
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
    const doAdaptTrekResultList = (results: any) =>
      adaptTrekResultList({
        resultsList: results,
        difficulties,
        themes,
        activities,
        cityDictionnary,
      });
    const doAdaptTouristicContentResult = async (
      results: any,
    ): Promise<TouristicContentDetails[]> => {
      return Promise.all(
        results.map(async (e: any) => {
          const touristicContentCategory = await getTouristicContentCategory(
            e.properties.category,
            language,
          );
          return adaptTouristicContentDetails({
            rawTCD: e,
            touristicContentCategory,
            sourceDictionnary: sources,
            cityDictionnary,
            themeDictionnary: themes,
          });
        }),
      );
    };
    const doAdaptOutdoorSites = (results: any) =>
      adaptOutdoorSites({
        rawOutdoorSites: results.map((r: any) => ({ ...r, ...r.properties })), // Because for some reasons outdoorSites attributes are in properties field
        themeDictionnary: themes,
        outdoorPracticeDictionnary,
        cityDictionnary,
      });
    const doAdaptTouristicEvents = (results: any) =>
      adaptTouristicEvents({
        rawTouristicEvents: results.map((r: any) => ({ ...r, ...r.properties })), // Because for some reasons outdoorSites attributes are in properties field
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
    suggestions.map(async sugg => {
      const type = sugg?.type ?? 'trek';
      const raw = (
        await Promise.all(sugg.ids.map(id => fetch(id, type, language).catch(() => null) as any))
      ).filter(e => !!e);

      const results = await adapt(type)(raw);
      return {
        ...sugg,
        type,
        results,
      };
    }),
  );

  return activitySuggestions;
};

const fetch = (id: string, type: Suggestion['type'], language: string) => {
  const fetch = {
    trek: fetchTrekResult,
    service: fetchTouristicContentDetails,
    outdoor: fetchOutdoorSiteDetails,
    events: fetchTouristicEventDetails,
  };

  const doFetch = fetch[type];

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

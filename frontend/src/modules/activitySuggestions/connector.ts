import getNextConfig from 'next/config';
import { getActivities } from 'modules/activities/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getOutdoorPractices } from 'modules/outdoorPractice/connector';
import { adaptoutdoorSitesResult } from 'modules/outdoorSite/adapter';
import { fetchOutdoorSiteDetails } from 'modules/outdoorSite/api';
import { RawOutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { adaptTrekResultList } from 'modules/results/adapter';
import { fetchTrekResult } from 'modules/results/api';
import { InformationCardTuple } from 'modules/results/interface';
import { adaptTouristicContentResult } from 'modules/touristicContent/adapter';
import { fetchTouristicContentDetails } from 'modules/touristicContent/api';
import { RawTouristicContentDetails } from 'modules/touristicContent/interface';
import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { adaptTouristicEventsResult } from 'modules/touristicEvent/adapter';
import { fetchTouristicEventDetails, fetchTouristicEvents } from 'modules/touristicEvent/api';
import { RawTouristicEventDetails } from 'modules/touristicEvent/interface';
import { getTouristicEventTypes } from 'modules/touristicEventType/connector';
import { ONE_DAY } from 'services/constants/staleTime';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { getCourseType } from 'modules/filters/courseType/connector';
import { getNetworks } from 'modules/networks/connector';
import { Suggestion } from '../home/interface';
import { ActivitySuggestion } from './interface';
const {
  publicRuntimeConfig: {
    resultCard: {
      trek: { informations = [] },
    },
  },
} = getNextConfig();

export const getActivitySuggestions = async (
  suggestions: Suggestion[],
  language: string,
  commonDictionaries?: CommonDictionaries,
): Promise<ActivitySuggestion[]> => {
  const { cities = {}, themes = {} } = commonDictionaries ?? {};
  const [
    difficulties,
    activities,
    touristicContentCategories,
    outdoorPracticeDictionnary,
    touristicEventType,
  ] = await Promise.all([
    getDifficulties(language),
    getActivities(language),
    getTouristicContentCategories(language),
    getOutdoorPractices(language),
    getTouristicEventTypes(language),
  ]);

  const activitySuggestions = await Promise.all(
    suggestions.map(async ({ type = 'trek', ...suggestion }) => {
      const props = {
        ...suggestion,
        type,
      };

      if (type === 'trek' && 'ids' in suggestion) {
        const treks = await Promise.all(
          suggestion.ids.map(async id => {
            const trek = await fetchTrekResult({ language }, id).catch(() => null);
            if (!trek) {
              return {};
            }
            if (!informations.includes('courseType')) {
              return trek;
            }
            const courseType = await getCourseType(trek.route, language);
            return { ...trek, courseType };
          }),
        );

        const networks = informations.includes('networks') ? await getNetworks(language) : {};
        return {
          ...props,
          results: adaptTrekResultList({
            resultsList: treks.filter(Boolean),
            difficulties,
            themes,
            activities,
            networks,
            cityDictionnary: cities,
          }),
        };
      }

      if (type === 'service' && 'ids' in suggestion) {
        const services = await Promise.all(
          suggestion.ids.map(
            id =>
              fetchTouristicContentDetails({ language }, id).catch(
                () => null,
              ) as Promise<RawTouristicContentDetails>,
          ),
        );
        return {
          ...props,
          results:
            services.length === 0
              ? []
              : adaptTouristicContentResult({
                  rawTouristicContent: services.filter(Boolean).map(
                    ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
                  ),
                  touristicContentCategories,
                  themeDictionnary: themes,
                  cityDictionnary: cities,
                }),
        };
      }

      if (type === 'outdoor' && 'ids' in suggestion) {
        const outdoors = await Promise.all(
          suggestion.ids.map(
            id =>
              fetchOutdoorSiteDetails({ language }, id).catch(
                () => null,
              ) as Promise<RawOutdoorSiteDetails>,
          ),
        );
        return {
          ...props,
          results: adaptoutdoorSitesResult({
            rawOutdoorSites: outdoors.filter(Boolean).map(
              ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons outdoor events attributes are in properties field
            ),
            themeDictionnary: themes,
            outdoorPracticeDictionnary,
            cityDictionnary: cities,
          }),
        };
      }

      if (type === 'events' && 'ids' in suggestion) {
        const events = await Promise.all(
          suggestion.ids.map(
            id =>
              fetchTouristicEventDetails({ language }, id).catch(
                () => null,
              ) as Promise<RawTouristicEventDetails>,
          ),
        );
        const eventResult = adaptTouristicEventsResult({
          rawTouristicEvents: events.filter(Boolean).map(
            ({ properties, ...result }) => ({ ...result, ...properties }), // Because for some reasons touristic events attributes are in properties field
          ),
          themeDictionnary: themes,
          cityDictionnary: cities,
          touristicEventType,
        });
        const resultsWithUnexpiredEvents = eventResult.filter(result => {
          const date = result.informations?.find(({ label }) => label === 'date') as
            | InformationCardTuple
            | undefined;

          if (date === undefined) {
            return true;
          }
          const [beginDate = 1, endDate = 1] = date.value;
          const today = new Date().toISOString();
          const endOfBeginDate = new Date(new Date(beginDate).getTime() + ONE_DAY).toISOString();
          const endOfEndDate = new Date(new Date(endDate).getTime() + ONE_DAY).toISOString();
          if ((endDate === 1 && endOfBeginDate < today) || endOfEndDate < today) {
            return false;
          }
          return true;
        });

        return {
          ...props,
          results: resultsWithUnexpiredEvents,
        };
      }

      if (type === 'upcomingEvents') {
        const [today] = new Date().toISOString().split('T');
        // The API does not offer a parameter to order by date
        const upcomingEvents = await fetchTouristicEvents({
          language,
          // All upcoming events are fetched,
          dates_after: today,
          page_size: 999,
        });

        // Ordered,
        const orderedUpcomingEventsResults = upcomingEvents.results.sort((a, b) =>
          a.begin_date.localeCompare(b.begin_date),
        );

        const numberOfItemsToDisplay =
          'numberOfItemsToDisplay' in suggestion ? suggestion.numberOfItemsToDisplay : 999;

        return {
          ...props,
          results: adaptTouristicEventsResult({
            // And sliced with the desired items
            rawTouristicEvents: orderedUpcomingEventsResults.slice(0, numberOfItemsToDisplay),
            themeDictionnary: themes,
            cityDictionnary: cities,
            touristicEventType,
          }),
        };
      }

      return null;
    }),
  );

  return activitySuggestions as ActivitySuggestion[];
};

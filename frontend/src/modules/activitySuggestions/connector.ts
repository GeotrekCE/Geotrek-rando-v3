import { getActivities } from 'modules/activities/connector';
import { getCities } from 'modules/city/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { getOutdoorPractices } from 'modules/outdoorPractice/connector';
import { adaptoutdoorSitesResult } from 'modules/outdoorSite/adapter';
import { fetchOutdoorSiteDetails } from 'modules/outdoorSite/api';
import { RawOutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { adaptTrekResultList } from 'modules/results/adapter';
import { fetchTrekResult } from 'modules/results/api';
import { InformationCardTuple, RawTrekResult } from 'modules/results/interface';
import { adaptTouristicContentResult } from 'modules/touristicContent/adapter';
import { fetchTouristicContentDetails } from 'modules/touristicContent/api';
import { RawTouristicContentDetails } from 'modules/touristicContent/interface';
import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { adaptTouristicEventsResult } from 'modules/touristicEvent/adapter';
import { fetchTouristicEventDetails } from 'modules/touristicEvent/api';
import { RawTouristicEventDetails } from 'modules/touristicEvent/interface';
import { getTouristicEventTypes } from 'modules/touristicEventType/connector';
import { ONE_DAY } from 'services/constants/staleTime';
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

  const activitySuggestions = await Promise.all(
    suggestions.map(
      async ({ type = 'trek', ids, numberOfEventsToDisplay = 999, ...suggestion }) => {
        const props = {
          ...suggestion,
          type,
        };

        if (type === 'trek') {
          const treks = await Promise.all(
            ids.map(
              id => fetchTrekResult({ language }, id).catch(() => null) as Promise<RawTrekResult>,
            ),
          );
          return {
            ...props,
            results: adaptTrekResultList({
              resultsList: treks.filter(Boolean),
              difficulties,
              themes,
              activities,
              cityDictionnary,
            }),
          };
        }

        if (type === 'service') {
          const services = await Promise.all(
            ids.map(
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
                    cityDictionnary,
                  }),
          };
        }

        if (type === 'outdoor') {
          const outdoors = await Promise.all(
            ids.map(
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
              cityDictionnary,
            }),
          };
        }

        if (type === 'events') {
          const events = await Promise.all(
            ids.map(
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
            cityDictionnary,
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
      },
    ),
  );

  return activitySuggestions as ActivitySuggestion[];
};

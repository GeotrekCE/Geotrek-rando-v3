import { mockRoute } from 'services/testing/utils';
import { mockActivitiesRoute } from 'modules/activities/__mocks__';

const mockMapTrekResultsResponse = () => ({
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 2,
      departure_geom: [6.1231119, 44.7475257],
    },
    {
      id: 501,
      departure_geom: [6.116054, 44.7465199],
    },
    {
      id: 582,
      departure_geom: [6.0860825, 44.7155137],
    },
    {
      id: 586,
      departure_geom: [6.1234998, 44.7481277],
    },
    {
      id: 592,
      departure_geom: [6.0668896, 44.7318421],
    },
  ],
});

const mockMapTouristicContentResultsResponse = () => ({
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 2,
    },
    {
      id: 501,
    },
    {
      id: 582,
    },
    {
      id: 586,
    },
    {
      id: 592,
    },
  ],
});

export const mockMapResultsRoute = (times: number): void => {
  mockRoute({
    route: '/trek',
    mockData: mockMapTrekResultsResponse(),
    additionalQueries: {
      fields: 'id,departure_geom,practice',
      page_size: 5,
    },
    times,
  });
  mockRoute({
    route: '/trek',
    mockData: mockMapTrekResultsResponse(),
    additionalQueries: {
      fields: 'id,departure_geom,practice',
      page_size: 5,
      page: 1,
    },
    times,
  });

  mockRoute({
    route: '/touristiccontent',
    mockData: mockMapTouristicContentResultsResponse(),
    additionalQueries: {
      fields: 'id,geometry,category',
      page_size: 5,
    },
    times,
  });
  mockRoute({
    route: '/touristiccontent',
    mockData: mockMapTouristicContentResultsResponse(),
    additionalQueries: {
      fields: 'id,geometry,category',
      page_size: 5,
      page: 1,
    },
    times,
  });

  // Each of the two calls above call activities route
  mockActivitiesRoute(2);
};

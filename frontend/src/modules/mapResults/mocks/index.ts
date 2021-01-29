import { mockRoute } from 'services/testing/utils';

export const mockMapResultsResponse = () => ({
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 2,
      parking_location: [6.1231119, 44.7475257],
    },
    {
      id: 501,
      parking_location: [6.116054, 44.7465199],
    },
    {
      id: 582,
      parking_location: [6.0860825, 44.7155137],
    },
    {
      id: 586,
      parking_location: [6.1234998, 44.7481277],
    },
    {
      id: 592,
      parking_location: [6.0668896, 44.7318421],
    },
  ],
});

export const mockMapResultsRoute = (times: number): void => {
  // Initial call to get the pages number
  mockRoute({
    route: '/trek',
    mockData: mockMapResultsResponse(),
    additionalQueries: {
      fields: 'id,parking_location,practice',
      page_size: 5,
    },
    times,
  });

  // Subsequent call to retrieve all pages, only one here because we have only 5 results with a page_size of 5
  mockRoute({
    route: '/trek',
    mockData: mockMapResultsResponse(),
    additionalQueries: {
      fields: 'id,parking_location,practice',
      page_size: 5,
      page: 1,
    },
    times,
  });
};

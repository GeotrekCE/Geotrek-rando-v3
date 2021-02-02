import { mockRoute } from 'services/testing/utils';

export const mockInformationDeskTypeResponse = () => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      label: 'Maisons du parc',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/desktype-info.svg',
    },
  ],
});

export const mockInformationDeskTypeRoute = (times: number): void =>
  mockRoute({
    route: '/informationdesktype',
    mockData: mockInformationDeskTypeResponse(),
    additionalQueries: {},
    times,
  });

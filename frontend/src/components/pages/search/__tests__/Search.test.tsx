import nock from 'nock';
import 'isomorphic-fetch';
import { render, waitForElementToBeRemoved } from 'services/testing/reactTestingLibraryWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SearchUI } from '../Search';

import {
  mockAccessibilityResponse,
  mockDifficultyResponse,
  mockPracticeResponse,
  mockRouteResponse,
  mockStructureResponse,
  mockThemeResponse,
  mockTrekResponse,
} from '../mocks';

/** Mock a server route with nock */
const mockRoute = ({
  route,
  mockData,
  additionalQueries = {},
  times = 1,
}: {
  route: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalQueries?: any;
  times?: number;
}) => {
  nock(process.env.REACT_APP_API_BASE_URL)
    .get(route)
    .query({ language: 'fr', ...additionalQueries })
    .times(times)
    .reply(200, mockData);
};

describe('Search page', () => {
  it('should display result cards', async () => {
    process.env.REACT_APP_API_BASE_URL = 'https://geotrekdemo.ecrins-parcnational.fr/api/v2';

    // Only called by results
    mockRoute({
      route: '/trek',
      mockData: mockTrekResponse,
      additionalQueries: {
        fields:
          'departure,name,themes,duration,length_2d,ascent,difficulty,reservation_system,thumbnail,practice',
        page_size: 5,
      },
    });

    // Called by both filterBar and results
    mockRoute({ route: '/difficulty', mockData: mockDifficultyResponse, times: 2 });
    mockRoute({ route: '/theme', mockData: mockThemeResponse, times: 2 });
    mockRoute({ route: '/practice', mockData: mockPracticeResponse, times: 2 });

    // Only called by filterBar
    mockRoute({ route: '/route', mockData: mockRouteResponse });
    mockRoute({ route: '/accessibility', mockData: mockAccessibilityResponse });
    mockRoute({ route: '/structure', mockData: mockStructureResponse });

    const queryClient = new QueryClient();

    const page = render(
      <QueryClientProvider client={queryClient}>
        <SearchUI />
      </QueryClientProvider>,
    );

    await waitForElementToBeRemoved(() =>
      page.queryByText('Loading... (to replace with proper design)'),
    );

    const textIsPresent = (text: string) => {
      page.getByText(text);
    };

    const texts = [
      'Molines-en-Champsaur',
      'Col de Font Froide',
      'Faune',
      'Géologie',
      'Archéologie et histoire',
      'Difficile',
      '7h',
      '15,2km',
      '1457m',
    ];
    texts.forEach(textIsPresent);
  });
});

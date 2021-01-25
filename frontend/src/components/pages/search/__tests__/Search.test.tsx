import 'isomorphic-fetch';
import nock from 'nock';
import { QueryClient, QueryClientProvider } from 'react-query';

import { render, waitForElementToBeRemoved } from 'services/testing/reactTestingLibraryWrapper';
import { getApiUrl } from 'services/envLoader';
import { mockResultsRoute } from 'modules/results/mocks';

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
  nock(getApiUrl())
    .get(route)
    .query({ language: 'fr', ...additionalQueries })
    .times(times)
    .reply(200, mockData);
};

describe('Search page', () => {
  it('should display result cards', async () => {
    // Only called by results
    mockResultsRoute(2);

    // Called by both filterBar and results
    mockRoute({ route: '/difficulty', mockData: mockDifficultyResponse, times: 3 });
    mockRoute({ route: '/theme', mockData: mockThemeResponse, times: 3 });
    mockRoute({ route: '/practice', mockData: mockPracticeResponse, times: 3 });

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

    await waitForElementToBeRemoved(() => page.queryByRole('progressbar'));

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
      '+1457m',
    ];
    texts.forEach(textIsPresent);
  });
});

import 'isomorphic-fetch';
import { mockTouristicContentCategoryRoute } from 'modules/touristicContentCategory/mocks';
import nock from 'nock';
import { QueryClient, QueryClientProvider } from 'react-query';

import { render, waitForElementToBeRemoved } from 'services/testing/reactTestingLibraryWrapper';
import { getApiUrl } from 'services/envLoader';
import { mockResultsRoute, mockTouristicContentResultsRoute } from 'modules/results/mocks';
import { mockMapResultsRoute } from 'modules/mapResults/mocks';

import { mockCityRoute } from 'modules/city/mocks';
import { SearchUI } from '../Search';

import {
  mockAccessibilityResponse,
  mockDifficultyResponse,
  mockPracticeResponse,
  mockRouteResponse,
  mockStructureResponse,
  mockThemeResponse,
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
    mockTouristicContentResultsRoute(2);

    mockRoute({
      route: '/trek',
      mockData: { next: null, previous: null, results: [], count: 0 },
      additionalQueries: {
        fields: 'id',
        page_size: 1,
        page: 1,
      },
    });
    mockRoute({
      route: '/touristiccontent',
      mockData: { next: null, previous: null, results: [], count: 0 },
      additionalQueries: {
        fields: 'id',
        page_size: 1,
        page: 1,
      },
    });

    // Called by both filterBar and results
    mockRoute({ route: '/trek_difficulty', mockData: mockDifficultyResponse, times: 3 });
    mockRoute({ route: '/theme', mockData: mockThemeResponse, times: 6 });
    mockRoute({ route: '/trek_practice', mockData: mockPracticeResponse, times: 3 });

    // Only called by filterBar
    mockRoute({ route: '/trek_route', mockData: mockRouteResponse });
    mockRoute({ route: '/trek_accessibility', mockData: mockAccessibilityResponse });
    mockRoute({ route: '/structure', mockData: mockStructureResponse });
    mockTouristicContentCategoryRoute(1);
    mockCityRoute(3);

    // Called once on page init then a 2nd time when filters initialize
    mockMapResultsRoute(2);

    const queryClient = new QueryClient();

    const page = render(
      <QueryClientProvider client={queryClient}>
        <SearchUI
          initialFiltersState={[
            {
              id: 'practices',
              label: 'Practices',
              options: [],
              selectedOptions: [],
              type: 'MULTIPLE',
            },
            {
              id: 'categories',
              label: 'Categories',
              options: [],
              selectedOptions: [],
              type: 'MULTIPLE',
            },
          ]}
          touristicContentCategoryMapping={{}}
          initialFiltersStateWithSelectedOptions={[
            {
              id: 'practices',
              label: 'Practices',
              options: [],
              selectedOptions: [],
              type: 'MULTIPLE',
            },
            {
              id: 'categories',
              label: 'Categories',
              options: [],
              selectedOptions: [],
              type: 'MULTIPLE',
            },
          ]}
        />
      </QueryClientProvider>,
    );

    // Wait for results loader + map loader
    await waitForElementToBeRemoved(() => page.queryAllByRole('progressbar'), { timeout: 5000 });

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

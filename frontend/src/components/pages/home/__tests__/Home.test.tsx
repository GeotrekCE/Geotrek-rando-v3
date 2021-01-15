import nock from 'nock';
import { render, waitFor } from 'services/testing/reactTestingLibraryWrapper';
import 'isomorphic-fetch';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Home } from '../';
import { mockActivitySuggestionsResponse } from '../mocks';

describe('Home page', () => {
  const queryClient = new QueryClient();
  it('AAU, I can see an activity suggestion', async () => {
    process.env.REACT_APP_API_BASE_URL = 'https://geotrekdemo.ecrins-parcnational.fr/api/v2';

    nock(process.env.REACT_APP_API_BASE_URL)
      .get('/trek')
      .query({
        fields: 'name,thumbnail',
        language: 'fr',
        page_size: 5,
      })
      .reply(200, mockActivitySuggestionsResponse);

    const home = render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );
    await home.findAllByText('Col de Font Froide');
  });
});

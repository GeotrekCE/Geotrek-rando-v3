import nock from 'nock';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import 'isomorphic-fetch';

import { QueryClient, QueryClientProvider } from 'react-query';

import { getGlobalConfig } from 'modules/utils/api.config';
import { Home } from '../';
import { mockActivitySuggestionsResponse } from '../mocks';

describe('Home page', () => {
  const queryClient = new QueryClient();
  it('AAU, I can see an activity suggestion', async () => {
    nock(getGlobalConfig().apiUrl)
      .get('/trek/2')
      .query({
        fields: 'name,attachments,id',
        language: 'fr',
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

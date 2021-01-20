import nock from 'nock';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import 'isomorphic-fetch';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getApiUrl } from 'services/envLoader';
import { DetailsUI } from '../';
import { rawActivity, rawDetails as rawDetailsMock } from '../Details.mocks';

describe('Details', () => {
  const idToTest = 2;
  const titleToTest = 'Col de Font Froide';
  const placeToTest = 'Molines-en-Champsaur';

  const queryClient = new QueryClient();

  it('AAU, I can see the name and place of the trek', async () => {
    nock(getApiUrl())
      .get(`/trek/${idToTest}/`)
      .query({
        language: 'fr',
        fields: 'name,departure,thumbnail,practice,public_transport,access,advised_parking',
      })
      .reply(200, rawDetailsMock);

    nock(getApiUrl())
      .get(`/practice/${rawDetailsMock.practice}/`)
      .query({
        language: 'fr',
      })
      .reply(200, rawActivity);

    const component = render(
      <QueryClientProvider client={queryClient}>
        <DetailsUI detailsId={`details-${idToTest}-Col de Font Froide`} />
      </QueryClientProvider>,
    );
    await component.findByText(titleToTest);
    await component.findByText(placeToTest);
  });
});

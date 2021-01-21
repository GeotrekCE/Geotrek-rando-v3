import nock from 'nock';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import 'isomorphic-fetch';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getApiUrl } from 'services/envLoader';
import { mockThemeResponse } from 'components/pages/search/mocks';
import { DetailsUI } from '../';
import {
  rawActivity,
  rawDetails as rawDetailsMock,
  rawDifficulty,
  rawRoute,
} from '../Details.mocks';

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
        fields:
          'name,departure,thumbnail,practice,public_transport,access,advised_parking,description_teaser,ambiance,themes,duration,length_2d,ascent,difficulty,route',
      })
      .reply(200, rawDetailsMock);

    nock(getApiUrl())
      .get(`/practice/${rawDetailsMock.practice}/`)
      .query({
        language: 'fr',
      })
      .reply(200, rawActivity);

    nock(getApiUrl())
      .get(`/difficulty/${rawDetailsMock.difficulty}/`)
      .query({
        language: 'fr',
      })
      .reply(200, rawDifficulty);

    nock(getApiUrl())
      .get(`/route/${rawDetailsMock.route}/`)
      .query({
        language: 'fr',
      })
      .reply(200, rawRoute);

    nock(getApiUrl())
      .get(`/theme`)
      .query({
        language: 'fr',
      })
      .reply(200, mockThemeResponse);

    const component = render(
      <QueryClientProvider client={queryClient}>
        <DetailsUI detailsId={`details-${idToTest}-Col-de-Font-Froide`} />
      </QueryClientProvider>,
    );
    await component.findByText(titleToTest);
    await component.findByText(placeToTest);
  });
});

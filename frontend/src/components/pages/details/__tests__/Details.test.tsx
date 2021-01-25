import nock from 'nock';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import 'isomorphic-fetch';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getApiUrl } from 'services/envLoader';
import { mockThemeResponse } from 'components/pages/search/mocks';
import { DetailsUI } from '../';
import {
  mockNetworksResponse,
  rawActivity,
  rawDetails as rawDetailsMock,
  rawDifficulty,
  rawRoute,
} from '../Details.mocks';
import { checkAndParseToList } from '../utils';

describe('Details', () => {
  const idToTest = 2;
  const titleToTest = 'Col de Font Froide';
  const placeToTest = 'Molines-en-Champsaur';

  const queryClient = new QueryClient();

  it('details.description is well parsed', () => {
    const [isValid, text, list] = checkAndParseToList(
      'Test introduction<br /><ol>\r\n<li>Une étape</li>\r\n<li>Une autre étape</li>\r\n<li>Pour finir</li>\r\n</ol>',
    ) as [boolean, JSX.Element, JSX.Element[]];
    expect(isValid).toBe(true);
    expect(text).toBeDefined();
    expect(list).toBeDefined();
    expect(list).toHaveLength(3);
    render(list[0]).getByText('Une étape');
    render(list[1]).getByText('Une autre étape');
    render(list[2]).getByText('Pour finir');
    render(text).getByText('Test introduction');
  });

  it('AAU, I can see details of the trek', async () => {
    nock(getApiUrl())
      .get(`/trek/${idToTest}/`)
      .query({
        language: 'fr',
        fields:
          'name,departure,thumbnail,practice,public_transport,access,advised_parking,description_teaser,ambiance,themes,duration,length_2d,ascent,difficulty,route,networks,description',
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

    nock(getApiUrl())
      .get(`/network`)
      .query({
        language: 'fr',
      })
      .reply(200, mockNetworksResponse);

    const component = render(
      <QueryClientProvider client={queryClient}>
        <DetailsUI detailsId={`details-${idToTest}-Col-de-Font-Froide`} />
      </QueryClientProvider>,
    );
    await component.findByText(titleToTest);
    await component.findByText(placeToTest);
    await component.findByText('Une autre étape');
  });
});

import nock from 'nock';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import 'isomorphic-fetch';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getApiUrl } from 'services/envLoader';
import { mockThemeResponse } from 'components/pages/search/mocks';
import { mockPoiTypeRoute } from 'modules/poiType/mocks';
import { mockPoiRoute } from 'modules/poi/mocks';
import { mockTouristicContentRoute } from 'modules/touristicContent/mocks';
import { mockTouristicContentCategoryRoute } from 'modules/touristicContentCategory/mocks';
import { mockCityRoute } from 'modules/city/mocks';
import { mockAccessibilitiesRoute } from 'modules/accessibility/mocks';
import { DetailsUI } from '../';
import {
  mockNetworksResponse,
  rawActivity,
  rawDetails as rawDetailsMock,
  rawDifficulty,
  rawRoute,
} from '../mocks/Details.mocks';
import { parseHtmlToList } from '../utils';

describe('Details', () => {
  const idToTest = 2;
  const titleToTest = 'Col de Font Froide';

  const queryClient = new QueryClient();

  it('details.description is well parsed', () => {
    const [intro, conclusion, list] = parseHtmlToList(
      'Test introduction<br /><ol>\r\n<li>Une étape</li>\r\n<li>Une autre étape</li>\r\n<li>Dernière étape</li>\r\n</ol>Conclusion',
    ) as [JSX.Element, JSX.Element, JSX.Element[]];
    expect(intro).toBeDefined();
    expect(list).toBeDefined();
    expect(list).toHaveLength(3);
    render(list[0]).getByText('Une étape');
    render(list[1]).getByText('Une autre étape');
    render(list[2]).getByText('Dernière étape');
    render(intro).getByText('Test introduction');
    render(conclusion).getByText('Conclusion');
  });

  it('AAU, I can see details of the trek', async () => {
    nock(getApiUrl())
      .get(`/trek/${idToTest}/`)
      .query({
        language: 'fr',
        fields:
          'id,name,departure,attachments,practice,public_transport,access,advised_parking,description_teaser,ambiance,themes,duration,length_2d,ascent,difficulty,route,networks,description,geometry,parking_location,pdf,gpx,kml,cities,disabled_infrastructure,accessibilities',
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

    mockPoiTypeRoute(1);
    mockPoiRoute(1, rawDetailsMock.id);

    mockTouristicContentCategoryRoute(1);
    mockTouristicContentRoute(1, rawDetailsMock.id);

    mockCityRoute(1);
    mockAccessibilitiesRoute(1);

    const component = render(
      <QueryClientProvider client={queryClient}>
        <DetailsUI detailsId={`details-${idToTest}-Col-de-Font-Froide`} />
      </QueryClientProvider>,
    );
    await component.findAllByText(titleToTest);
    await component.findByText('La Motte-en-Champsaur');
    await component.findAllByText('Lagopède alpin');
    await component.findAllByText('Refuge de la Lavey');
    await component.findByText('Auberge Gaillard');
    await component.findByText(
      "L'auberge propose, dans un hameau de montagne en bout de route, en pleine nature, un hébergement de séjour, nuitée, demi-pension et pension complète dans un décor de la vie d'antan et d'aujourd'hui.",
    );
    const download = await component.findByText('Télécharger');
    expect(download).toHaveAttribute('href', rawDetailsMock.pdf);
    await component.findAllByText('Accessibilité');
    await component.findByText('Poussette');
  });
});

import nock from 'nock';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import 'isomorphic-fetch';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockThemeResponse } from 'components/pages/search/mocks';
import { GeotrekAPI } from 'services/api/client';
import { mockPoiTypeRoute } from 'modules/poiType/mocks';
import { mockPoiRoute } from 'modules/poi/mocks';
import { mockTouristicContentRoute } from 'modules/touristicContent/mocks';
import { mockTouristicContentCategoryRoute } from 'modules/touristicContentCategory/mocks';
import { mockCityRoute } from 'modules/city/mocks';
import { mockAccessibilitiesRoute } from 'modules/accessibility/mocks';
import { mockSourceRoute } from 'modules/source/mocks';
import { mockInformationDeskRoute } from 'modules/informationDesk/mocks';
import { mockLabelRoute } from 'modules/label/mocks';
import { mockSensitiveAreaRoute } from 'modules/sensitiveArea/mocks';
import { mockSensitiveAreaPracticeRoute } from 'modules/sensitiveAreaPractice/mocks';
import { mockTrekRatingRoute } from 'modules/trekRating/mocks';
import { mockTrekRatingScaleRoute } from 'modules/trekRatingScale/mocks';
import { mockSignageRoute } from 'modules/signage/mocks';
import { mockSignageTypeRoute } from 'modules/signageType/mocks';
import { mockServiceRoute } from 'modules/service/mocks';
import { mockServiceTypeRoute } from 'modules/serviceType/mocks';
import { mockInfrastructureRoute } from 'modules/infrastructure/mocks';
import { mockInfrastructureTypeRoute } from 'modules/infrastructureType/mocks';
import { getGlobalConfig } from 'modules/utils/api.config';
import {
  mockNetworksResponse,
  rawActivity,
  rawDetails as rawDetailsMock,
  rawDifficulty,
  rawRoute,
} from 'modules/details/mocks/mocks';

import { DetailsUI } from '../';

GeotrekAPI.defaults.adapter = require('axios/lib/adapters/http');

describe('Details', () => {
  const idToTest = 2;
  const titleToTest = 'Col de Font Froide';

  const queryClient = new QueryClient();

  it('AAU, I can see details of the trek', async () => {
    nock(getGlobalConfig().apiUrl)
      .get(`/trek/${idToTest}/`)
      .query({
        language: 'fr',
        fields:
          'id,name,departure,arrival,cities,attachments,practice,public_transport,access,advised_parking,description_teaser,ambiance,themes,duration,length_2d,ascent,descent,difficulty,route,networks,description,geometry,parking_location,pdf,gpx,kml,departure_city,disabled_infrastructure,accessibilities,source,information_desks,labels,advice,gear,points_reference,children,web_links,elevation_area_url,altimetric_profile,reservation_id,accessibility_signage,accessibility_slope,accessibility_width,accessibility_covering,accessibility_exposure,accessibility_advice,attachments_accessibility,accessibility_level,ratings,ratings_description',
        format: 'geojson',
      })
      .reply(200, rawDetailsMock);

    nock(getGlobalConfig().apiUrl)
      .get(`/trek_practice/${rawDetailsMock.properties.practice as number}/`)
      .query({
        language: 'fr',
      })
      .reply(200, rawActivity);

    nock(getGlobalConfig().apiUrl)
      .get(`/trek_difficulty/${rawDetailsMock.properties.difficulty as number}/`)
      .query({
        language: 'fr',
      })
      .reply(200, rawDifficulty);

    nock(getGlobalConfig().apiUrl)
      .get(`/trek_route/${rawDetailsMock.properties.route}/`)
      .query({
        language: 'fr',
      })
      .reply(200, rawRoute);

    nock(getGlobalConfig().apiUrl)
      .get(`/theme`)
      .query({
        language: 'fr',
      })
      .reply(200, mockThemeResponse);

    nock(getGlobalConfig().apiUrl)
      .get(`/trek_network`)
      .query({
        language: 'fr',
      })
      .reply(200, mockNetworksResponse);

    mockPoiTypeRoute(1);
    mockPoiRoute(1, rawDetailsMock.properties.id);

    mockTouristicContentCategoryRoute(1);
    mockTouristicContentRoute(1, rawDetailsMock.properties.id);

    mockSignageTypeRoute(1);
    mockSignageRoute(1, rawDetailsMock.properties.id);
    mockServiceTypeRoute(1);
    mockServiceRoute(1, rawDetailsMock.properties.id);
    mockInfrastructureTypeRoute(1);
    mockInfrastructureRoute(1, rawDetailsMock.properties.id);

    mockCityRoute(1);
    mockAccessibilitiesRoute(1);
    mockSourceRoute(1);
    mockInformationDeskRoute(1);
    mockLabelRoute(1);
    mockSensitiveAreaRoute(1);
    mockSensitiveAreaPracticeRoute(1);
    mockTrekRatingRoute();
    mockTrekRatingScaleRoute();

    const component = render(
      <QueryClientProvider client={queryClient}>
        <DetailsUI detailsId={`${idToTest}-Col-de-Font-Froide`} language={'fr'} />
      </QueryClientProvider>,
    );
    await component.findAllByText(titleToTest);
    await component.findByText('La Motte-en-Champsaur');
    await component.findAllByText('Lagopède alpin');
    await component.findAllByText('Refuge de la Lavey');
    await component.findAllByText('Auberge Gaillard');
    await component.findByText(
      "L'auberge propose, dans un hameau de montagne en bout de route, en pleine nature, un hébergement de séjour, nuitée, demi-pension et pension complète dans un décor de la vie d'antan et d'aujourd'hui.",
    );
    await component.findAllByTestId('download-button');
    await component.findAllByText('Accessibilité');
    await component.findByText('Poussette');
    await component.findByText('Source');
  });
});

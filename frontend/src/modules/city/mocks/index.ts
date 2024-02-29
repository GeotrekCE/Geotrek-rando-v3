import { getGlobalConfig } from 'modules/utils/api.config';
import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawCity } from '../interface';

export const mockCityResponse = (): APIResponseForList<RawCity> => ({
  count: 3,
  next: 'https://geotrekdemo.ecrins-parcnational.fr/api/v2/city/?fields=name%2Cid&page=2',
  previous: null,
  results: [
    {
      id: '05090',
      name: 'La Motte-en-Champsaur',
    },
    {
      id: '38207',
      name: 'Lavaldens',
    },
    {
      id: '38052',
      name: "Le Bourg-d'Oisans",
    },
    { id: '05045', name: 'Molines-en-Champsaur' },
  ],
});

export const mockCityRoute = (times: number): void =>
  mockRoute({
    route: '/city/',
    mockData: mockCityResponse(),
    additionalQueries: { fields: 'id,name', page_size: getGlobalConfig().searchResultsPageSize },
    times,
  });

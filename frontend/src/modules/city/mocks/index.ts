import { getGlobalConfig } from 'modules/utils/api.config';
import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawCity } from '../interface';

export const mockCityResponse = (): APIResponseForList<RawCity> => ({
  count: 3,
  next: 'https://geotrekdemo.ecrins-parcnational.fr/api/v2/city/?fields=name%2Cid%2Ccode&page=2',
  previous: null,
  results: [
    {
      id: '1',
      name: 'La Motte-en-Champsaur',
      code: '05090',
    },
    {
      id: '2',
      name: 'Lavaldens',
      code: '38207',
    },
    {
      id: '3',
      name: "Le Bourg-d'Oisans",
      code: '38052',
    },
    { id: '4', name: 'Molines-en-Champsaur', code: '05045' },
  ],
});

export const mockCityRoute = (times: number): void =>
  mockRoute({
    route: '/city/',
    mockData: mockCityResponse(),
    additionalQueries: {
      fields: 'id,name,code',
      page_size: getGlobalConfig().searchResultsPageSize,
    },
    times,
  });

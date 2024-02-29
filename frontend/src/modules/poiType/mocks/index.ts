import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawPoiType } from '../interface';

export const mockPoiTypeResponse = (): APIResponseForList<RawPoiType> => ({
  count: 15,
  next: null,
  previous: null,
  results: [
    {
      id: 11,
      label: 'Architecture',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-architecture.png',
    },
    {
      id: 9,
      label: 'Archéologie',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-archeology.png',
    },
    {
      id: 15,
      label: 'Col',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-pass.png',
    },
    {
      id: 3,
      label: 'Faune',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-fauna.png',
    },
    {
      id: 2,
      label: 'Flore',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-flora.png',
    },
    {
      id: 12,
      label: 'Glacier',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-glacier.png',
    },
    {
      id: 8,
      label: 'Géologie',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-geology.png',
    },
    {
      id: 10,
      label: 'Histoire',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-history.png',
    },
    {
      id: 6,
      label: 'Lac',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-lake.png',
    },
    {
      id: 14,
      label: 'Pastoralisme',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-pastoral.png',
    },
    {
      id: 1,
      label: 'Petit patrimoine',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-patrimony.png',
    },
    {
      id: 4,
      label: 'Point de vue',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-panorama.png',
    },
    {
      id: 5,
      label: 'Refuge',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-refuge.png',
    },
    {
      id: 13,
      label: 'Savoir-faire',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-knowhow.png',
    },
    {
      id: 7,
      label: 'Sommet',
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/poi-peak.png',
    },
  ],
});

export const mockPoiTypeRoute = (times: number): void =>
  mockRoute({
    route: '/poi_type/',
    mockData: mockPoiTypeResponse(),
    additionalQueries: {},
    times,
  });

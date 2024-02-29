import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawListActivity } from '../interface';

export const mockActivitiesResponse = (): APIResponseForList<RawListActivity> => ({
  count: 4,
  next: null,
  previous: null,
  results: [
    {
      id: 3,
      name: 'Cheval',
      order: null,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-horse.svg',
    },
    {
      id: 4,
      name: 'Pédestre',
      order: null,
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg',
    },
    {
      id: 1,
      name: 'VTT',
      order: null,
      pictogram:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-mountainbike.svg',
    },
    {
      id: 2,
      name: 'Vélo',
      order: null,
      pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-bike.svg',
    },
  ],
});

export const mockActivitiesRoute = (times: number): void =>
  mockRoute({
    route: '/trek_practice/',
    mockData: mockActivitiesResponse(),
    times,
  });

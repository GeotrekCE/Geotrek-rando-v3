import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawInformationDesk } from '../interface';

export const mockInformationDeskResponse = (): APIResponseForList<RawInformationDesk> => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      description:
        "Information, documentation et un espace d'accueil avec des expositions permanente et temporaires. La maison du Parc est labellis&eacute;e &laquo;Tourisme et handicap&raquo;. Entr&eacute;e libre. Toutes les animations du Parc sont gratuites sauf mention contraire.",
      email: 'valgaudemar@ecrins-parcnational.fr',
      municipality: 'La Chapelle-en-Valgaudemar',
      name: 'Maison du Parc du Valgaudemar',
      phone: '04 92 55 25 19',
      photo_url:
        'https://geotrekdemo.ecrins-parcnational.fr/media/upload/mdpvalgau.jpg.150x150_q85.jpg',
      postal_code: '05800',
      street: 'Ancien Asile Saint-Paul',
      type: {
        id: 1,
        label: 'Maisons du parc',
        pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/desktype-info.svg',
      },
      website: 'http://www.ecrins-parcnational.fr',
      accessibility: '',
      longitude: 2,
      latitude: 3,
    },
  ],
});

export const mockInformationDeskRoute = (times: number): void =>
  mockRoute({
    route: '/informationdesk/',
    mockData: mockInformationDeskResponse(),
    additionalQueries: {
      fields:
        'id,name,street,postal_code,municipality,website,email,phone,description,photo_url,type,accessibility,latitude,longitude',
      page_size: 50,
    },
    times,
  });

import { mockRoute } from 'services/testing/utils';

export const mockInformationDeskResponse = () => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      description:
        "Information, documentation et un espace d'accueil avec des expositions permanente et temporaires. La maison du Parc est labellis&eacute;e &laquo;Tourisme et handicap&raquo;. Entr&eacute;e libre. Toutes les animations du Parc sont gratuites sauf mention contraire.",
      email: 'valgaudemar@ecrins-parcnational.fr',
      municipality: 'La Chapelle-en-Valgaudemar',
      name: 'Maison du Parc du Valgaudemar',
      phone: '04 92 55 25 19',
      postal_code: '05800',
      street: 'Ancien Asile Saint-Paul',
      type: {
        id: 1,
        label: 'Maisons du parc',
        pictogram: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/desktype-info.svg',
      },
      website: 'http://www.ecrins-parcnational.fr',
    },
  ],
});

export const mockInformationDeskRoute = (times: number): void =>
  mockRoute({
    route: '/informationdesk',
    mockData: mockInformationDeskResponse(),
    additionalQueries: {
      fields: 'name,street,postal_code,municipality,website,email,phone,description,type',
    },
    times,
  });

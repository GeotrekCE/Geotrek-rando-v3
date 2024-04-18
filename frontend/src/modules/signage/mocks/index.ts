import { mockRoute } from 'services/testing/utils';
import { APIResponseForList } from 'services/api/interface';
import { RawSignage } from '../interface';

export const mockSignageResponse = (): APIResponseForList<RawSignage> => ({
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      attachments: [
        {
          author: 'Jean-Philippe Telmon - PNE',
          backend: '',
          thumbnail:
            'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-tenue-dete.jpg.120x120_q85_crop.jpg',
          legend: "Lagopède alpin en tenue d'été",
          title: 'lagopede-alpin-en-tenue-dete',
          url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-tenue-dete.jpg',
          type: 'image',
          filetype: {
            id: 1,
            type: 'Topoguide',
          },
        },
        {
          author: 'Damien Combrisson - PNE',
          backend: '',
          thumbnail:
            'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-plumage-dhiver.jpg.120x120_q85_crop.jpg',
          legend: "Lagopède alpin en plumage d'hiver",
          title: 'lagopede-alpin-en-plumage-dhiver',
          url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_poi/442/lagopede-alpin-en-plumage-dhiver.jpg',
          type: 'image',
          filetype: {
            id: 1,
            type: 'Topoguide',
          },
        },
      ],
      id: 1,
      description: 'Signage description',
      name: 'Signage name',
      geometry: { type: 'Point', coordinates: [1, 2, 3] },
      type: 1,
      code: '21548',
      condition: 1,
      implantation_year: 2018,
      printed_elevation: 2854,
      sealing: 2,
      structure: 'foo',
    },
  ],
});

export const mockSignageRoute = (times: number, nearTrek: number): void =>
  mockRoute({
    route: '/signage/',
    mockData: mockSignageResponse(),
    additionalQueries: {
      fields: 'attachments,description,id,geometry,name,type',
      near_trek: nearTrek,
    },
    times,
  });

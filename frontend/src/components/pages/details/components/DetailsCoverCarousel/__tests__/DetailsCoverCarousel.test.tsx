import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsCoverCarousel } from '../DetailsCoverCarousel';
describe('DetailsCoverCarousel', () => {
  it('should display a DetailsCoverCarousel', () => {
    const propsCoverCarousel = {
      images: [
        {
          url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/2/lac_de_leychauda_parc_national_des_ecrins.jpg',
          legend: 'Lac',
          author: 'admin',
        },
        {
          url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/2/le-depart-du-hameau-de-molines.JPG',
          legend: 'Marmotte',
          author: 'admin',
        },
        {
          url: 'https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/2/arrivee-au-col-de-font-froide.JPG',
          legend: 'Arrivée au col de Font Froide',
          author: 'Dominique Vincent - PNE',
        },
      ],
    };
    const component = render(<DetailsCoverCarousel {...propsCoverCarousel} />);

    expect(component).toMatchSnapshot();
  });
});

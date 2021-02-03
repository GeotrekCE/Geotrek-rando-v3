import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsLabel } from '../DetailsLabel';
describe('DetailsLabel', () => {
  it('should display a DetailsLabel', () => {
    const propsLabel = {
      id: 1,
      advice:
        'Le Parc national est un territoire naturel, ouvert à tous, mais soumis à une réglementation qu’il est utile de connaître pour préparer son séjour',
      name: 'En coeur de parc',
      pictogramUri: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/desktype-info.svg',
      className: '',
    };
    const component = render(<DetailsLabel {...propsLabel} />);

    expect(component).toMatchSnapshot();
  });
});

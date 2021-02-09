import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsTrekFamilyCarousel } from '../DetailsTrekFamilyCarousel';
describe('DetailsTrekFamilyCarousel', () => {
  it('should display a DetailsTrekFamilyCarousel', () => {
    const propsTrekFamilyCarousel = {
      trekId: '604',
      parentId: '501',
      trekChildren: [
        {
          id: '596',
          rank: 1,
          name: 'Boucle de malade',
        },
        {
          id: '604',
          rank: 2,
          name: 'Deuxième étape',
        },
        {
          id: '2',
          rank: 3,
          name: 'Troisième étape',
        },
        {
          id: '4',
          rank: 4,
          name: 'Quatrième étape',
        },
        {
          id: '5',
          rank: 5,
          name: 'Encore une étape',
        },
        {
          id: '6',
          rank: 6,
          name: "C'est la fin !",
        },
      ],
    };
    const component = render(<DetailsTrekFamilyCarousel {...propsTrekFamilyCarousel} />);

    expect(component).toMatchSnapshot();
  });
});

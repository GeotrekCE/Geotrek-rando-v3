import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsGear } from '../DetailsGear';
describe('DetailsGear', () => {
  it('should display a DetailsGear', () => {
    const propsAdvice = {
      text: "Pour d'autres informations, se reporter aux recommandations sp&eacute;cifiques de chaque &eacute;tape.",
    };
    const component = render(<DetailsGear {...propsAdvice} />);

    expect(component).toMatchSnapshot();
  });
});

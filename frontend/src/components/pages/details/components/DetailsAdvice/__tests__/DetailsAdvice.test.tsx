import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsAdvice } from '../DetailsAdvice';
describe('DetailsAdvice', () => {
  it('should display a DetailsAdvice', () => {
    const propsAdvice = {
      text: "Pour d'autres informations, se reporter aux recommandations sp&eacute;cifiques de chaque &eacute;tape.",
    };
    const component = render(<DetailsAdvice {...propsAdvice} />);

    expect(component).toMatchSnapshot();
  });
});

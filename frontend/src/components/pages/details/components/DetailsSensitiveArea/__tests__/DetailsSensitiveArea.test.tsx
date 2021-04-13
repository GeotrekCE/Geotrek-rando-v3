import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsSensitiveArea } from '../DetailsSensitiveArea';
describe('DetailsSensitiveArea', () => {
  it('should display a DetailsSensitiveArea', () => {
    const component = render(
      <DetailsSensitiveArea
        name="Zone sensible de test"
        description="<p>Cette zone est très sensible</p>"
        contact={'<h2>Une personne a contacter</h2>'}
        infoUrl={'http://ensavoirplusici.com'}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});

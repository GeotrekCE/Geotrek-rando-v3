import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsDescription } from '../DetailsDescription';
import { checkAndParseToList } from '../../../utils';
describe('DetailsDescription', () => {
  it('should display a well parsed description Element', () => {
    const [, intro, steps] = checkAndParseToList(
      'Test introduction<br /><ol>\r\n<li>Une étape</li>\r\n<li>Une autre étape</li>\r\n<li>Pour finir</li>\r\n</ol>',
    );
    const detailsDescription = render(<DetailsDescription intro={intro} steps={steps} />);

    expect(detailsDescription).toMatchSnapshot();
  });
});

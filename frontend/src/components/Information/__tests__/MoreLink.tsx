import MoreLink from 'components/Information/MoreLink';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { rawDetailsProperties } from 'modules/details/mocks/mocks';

test("AAU, I can see more informations's link", () => {
  render(<MoreLink link={rawDetailsProperties.web_links[0]} />);
});

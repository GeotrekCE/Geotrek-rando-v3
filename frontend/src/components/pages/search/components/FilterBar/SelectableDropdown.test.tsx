import { Option } from 'modules/filters/interface';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { SelectableDropdown } from './SelectableDropdown';

test('SelectableDropdown should render properly', () => {
  const component = render(
    <SelectableDropdown
      filterType="MULTIPLE"
      name="activities"
      placeholder="search.filters.difficulty"
      options={[
        {
          label: 'Très Facile',
          value: '1',
        },
        {
          label: 'Facile',
          value: '2',
        },
      ]}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setFilterSelectedOptions={(values: Option[]) => {}}
      selectedFilters={[
        {
          label: 'Très Facile',
          value: '1',
        },
      ]}
    />,
  );
  expect(component).toMatchSnapshot();
});

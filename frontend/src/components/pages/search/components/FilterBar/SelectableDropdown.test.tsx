import { Option } from 'modules/filters/interface';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { SelectableDropdown } from './SelectableDropdown';

test('SelectableDropdown shoudl render properly', () => {
  const component = render(
    <SelectableDropdown
      name="activities"
      placeholder="search.filters.DIFFICULTY"
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

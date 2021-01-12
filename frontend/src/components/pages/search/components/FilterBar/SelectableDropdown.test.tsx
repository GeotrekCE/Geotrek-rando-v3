/* eslint-disable @typescript-eslint/no-empty-function */
import { DisplayableFilter } from 'modules/filters/interface';
import { render } from 'services/testing/reactTestingLibraryWrapper';
import { SelectableDropdown } from './SelectableDropdown';

test('SelectableDropdown shoudl render properly', () => {
  const component = render(
    <SelectableDropdown
      name="activities"
      placeholder="Activités"
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
      setFilterValues={(values: DisplayableFilter[]) => {}}
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

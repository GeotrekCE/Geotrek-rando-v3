import { render } from 'services/testing/reactTestingLibraryWrapper';
import { SelectableDropdown } from './SelectableDropdown';

test('SelectableDropdown shoudl render properly', () => {
  const component = render(
    <SelectableDropdown
      name="activities"
      placeholder="Activités"
      options={[
        {
          label: 'Randonnée',
          value: 'walking',
        },
      ]}
    />,
  );
  expect(component).toMatchSnapshot();
});

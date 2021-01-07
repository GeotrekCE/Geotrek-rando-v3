import { FunctionComponent } from 'react';
import { SelectableDropdown } from './SelectableDropdown';

export const FilterBar: FunctionComponent = () => {
  return (
    <div className="w-full py-3 pl-6 pr-2 hidden desktop:flex shadow">
      <SelectableDropdown
        name="difficulties"
        placeholder="Difficulté"
        options={[
          { value: 'veryEasy', label: 'Très facile' },
          { value: 'easy', label: 'Facile' },
          { value: 'medium', label: 'Moyen' },
          { value: 'hard', label: 'Difficile' },
        ]}
      />
    </div>
  );
};

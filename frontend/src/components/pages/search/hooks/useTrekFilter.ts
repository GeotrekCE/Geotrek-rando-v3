import { ChangeEvent, useState } from 'react';

export const useTrekFilter = (): {
  filterInput: string | null;
  textFilterState: string | null;
  onFilterInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFilterSubmit: () => void;
} => {
  const [filterInput, setFilterInput] = useState<string | null>(null);
  const [textFilterState, setTextFilterState] = useState<string | null>(null);

  const onFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(event.target.value);
  };

  const onFilterSubmit = () => {
    setTextFilterState(filterInput);
  };

  return {
    filterInput,
    textFilterState,
    onFilterInputChange,
    onFilterSubmit,
  };
};

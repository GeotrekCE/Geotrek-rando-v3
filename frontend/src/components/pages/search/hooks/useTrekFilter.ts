import { ChangeEvent, useState } from 'react';

export const useTrekFilter = (): {
  filterInput: string | null;
  filterValue: string | null;
  onFilterInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFilterSubmit: () => void;
} => {
  const [filterInput, setFilterInput] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);

  const onFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(event.target.value);
  };

  const onFilterSubmit = () => {
    setFilterValue(filterInput);
  };

  return {
    filterInput,
    filterValue,
    onFilterInputChange,
    onFilterSubmit,
  };
};

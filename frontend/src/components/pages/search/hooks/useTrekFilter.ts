import { ChangeEvent, useState } from 'react';

export const useTrekFilter = (): {
  textFilterInput: string | null;
  textFilterState: string | null;
  onFilterInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFilterSubmit: () => void;
} => {
  const [textFilterInput, setTextFilterInput] = useState<string | null>(null);
  const [textFilterState, setTextFilterState] = useState<string | null>(null);

  const onFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFilterInput(event.target.value);
  };

  const onFilterSubmit = () => {
    setTextFilterState(textFilterInput);
  };

  return {
    textFilterInput,
    textFilterState,
    onFilterInputChange,
    onFilterSubmit,
  };
};

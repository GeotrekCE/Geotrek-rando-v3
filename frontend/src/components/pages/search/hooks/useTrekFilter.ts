import { ChangeEvent, useState } from 'react';

export const useTrekFilter = (): {
  textFilterInput: string | null;
  textFilterState: string | null;
  onTextFilterInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onTextFilterSubmit: () => void;
} => {
  const [textFilterInput, setTextFilterInput] = useState<string | null>(null);
  const [textFilterState, setTextFilterState] = useState<string | null>(null);

  const onTextFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFilterInput(event.target.value);
  };

  const onTextFilterSubmit = () => {
    setTextFilterState(textFilterInput);
  };

  return {
    textFilterInput,
    textFilterState,
    onTextFilterInputChange,
    onTextFilterSubmit,
  };
};

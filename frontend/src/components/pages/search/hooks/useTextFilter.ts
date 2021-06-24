import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

export const useTextFilter = (): {
  textFilterInput: string | null;
  textFilterState: string | null;
  onTextFilterInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onTextFilterSubmit: () => void;
  resetTextFilter: () => void;
} => {
  const initialOptions = useRouter().query;

  const initialTextFromRedirect =
    initialOptions.rawText !== undefined
      ? (initialOptions.rawText as string).replace(/-/g, ' ')
      : null;
  const initialTextFilterValue =
    initialOptions.text !== undefined
      ? (initialOptions.text as string)
      : initialTextFromRedirect || null;

  const [textFilterInput, setTextFilterInput] = useState<string | null>(initialTextFilterValue);
  const [textFilterState, setTextFilterState] = useState<string | null>(initialTextFilterValue);

  const onTextFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextFilterInput(event.target.value);
  };

  const onTextFilterSubmit = () => {
    setTextFilterState(textFilterInput);
  };

  const resetTextFilter = () => {
    setTextFilterInput(null);
    setTextFilterState(null);
  };

  return {
    textFilterInput,
    textFilterState,
    onTextFilterInputChange,
    onTextFilterSubmit,
    resetTextFilter,
  };
};

import { useState } from 'react';

export const useControlSection = () => {
  const [controlSectionState, setControlSectionState] = useState<'EXPANDED' | 'COLLAPSED'>(
    'COLLAPSED',
  );
  const toggleControlSection = () =>
    setControlSectionState(prevState => (prevState === 'COLLAPSED' ? 'EXPANDED' : 'COLLAPSED'));

  return {
    controlSectionState,
    toggleControlSection,
  };
};

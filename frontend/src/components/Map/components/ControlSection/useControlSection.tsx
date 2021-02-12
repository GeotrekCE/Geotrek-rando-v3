import { useState } from 'react';

export const useControlSection = () => {
  const [controlSectionState, setControlSectionState] = useState<'EXPANDED' | 'COLLAPSED'>(
    'COLLAPSED',
  );
  const expandControlSection = () => setControlSectionState('EXPANDED');
  const collapseControlSection = () => setControlSectionState('COLLAPSED');
  return {
    controlSectionState,
    expandControlSection,
    collapseControlSection,
  };
};

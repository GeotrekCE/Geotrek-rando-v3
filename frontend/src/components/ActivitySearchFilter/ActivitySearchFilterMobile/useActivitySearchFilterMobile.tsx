import { useState } from 'react';

export const useActivitySearchFilterMobile = () => {
  const [selectedActivityId, updateSelectedActivityId] = useState<string | null>(null);
  return {
    selectedActivityId,
    updateSelectedActivityId,
  };
};

import { useState } from 'react';

export const useActivitySearchFilterMobile = () => {
  const [selectedActivity, updateSelectedActivity] = useState<string | null>(null);
  return {
    selectedActivity,
    updateSelectedActivity,
  };
};

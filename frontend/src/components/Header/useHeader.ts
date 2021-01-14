import { getHeaderConfig } from 'modules/header/utills';

export const useHeader = () => {
  const config = getHeaderConfig();

  return { config };
};

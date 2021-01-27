import { getHeaderConfig } from 'modules/header/utills';
import { useIntl } from 'react-intl';

export const useHeader = () => {
  const config = getHeaderConfig();

  const intl = useIntl();

  return { config, intl };
};

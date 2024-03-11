import { MenuItem } from 'modules/menuItems/interface';
import { getDefaultLanguage, getHeaderConfig } from 'modules/header/utills';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { geMenuItems } from 'modules/menuItems/connector';

export const useHeader = () => {
  const config = getHeaderConfig();
  const language = useRouter().locale ?? getDefaultLanguage();
  const { data: menuItems } = useQuery<MenuItem[], Error>(
    ['header', language],
    () => geMenuItems(language),
    {
      staleTime: ONE_DAY,
    },
  );
  const intl = useIntl();

  return { config, intl, menuItems };
};

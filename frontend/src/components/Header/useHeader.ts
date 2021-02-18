import { getFlatPages } from 'modules/flatpage/connector';
import { MenuItem } from 'modules/header/interface';
import { getDefaultLanguage, getHeaderConfig } from 'modules/header/utills';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';

export const useHeader = () => {
  const config = getHeaderConfig();
  const language = useRouter().locale ?? getDefaultLanguage();
  const { data } = useQuery<MenuItem[], Error>('header', () => getFlatPages(language));
  const intl = useIntl();

  return { config, intl, menuItems: data };
};

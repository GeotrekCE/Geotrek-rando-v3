import { getFlatPages } from 'modules/flatpage/connector';
import { MenuItem } from 'modules/header/interface';
import { getHeaderConfig } from 'modules/header/utills';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';

export const useHeader = (language: string) => {
  const config = getHeaderConfig();
  const { data } = useQuery<MenuItem[], Error>('header', () => getFlatPages(language));
  const intl = useIntl();

  return { config, intl, menuItems: data };
};

import { MutableRefObject } from 'react';
import { MenuItem } from 'modules/menuItems/interface';
import { getDefaultLanguage, getHeaderConfig } from 'modules/header/utills';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { geMenuItems } from 'modules/menuItems/connector';
import useSize from 'hooks/useSize';

export const useHeader = (menuNode: MutableRefObject<HTMLDivElement | null | undefined>) => {
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

  const { height = 0 } = useSize(menuNode) ?? {};

  const isDesktopMenu = menuNode.current === null || (height < 100 && height !== 0);

  return { config, intl, menuItems, isDesktopMenu };
};

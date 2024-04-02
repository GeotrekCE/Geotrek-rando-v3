import { MutableRefObject } from 'react';
import { MenuItem } from 'modules/menuItems/interface';
import { getFlatPages } from 'modules/flatpage/connector';
import { getDefaultLanguage, getHeaderConfig } from 'modules/header/utills';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { geMenuItems } from 'modules/menuItems/connector';
import useSize from 'hooks/useSize';
import { getAPIVersion } from 'modules/APIVersion/connector';
import { isUpperOrEqualCurrentAPIVersion } from 'modules/APIVersion/utils';

export const useHeader = (menuNode: MutableRefObject<HTMLDivElement | null | undefined>) => {
  const config = getHeaderConfig();
  const language = useRouter().locale ?? getDefaultLanguage();

  const { data: currentAPIVersion } = useQuery(['APIVersion'], () => getAPIVersion());

  const isUpperOrEqualCurrentAPIVersion_2_104 = isUpperOrEqualCurrentAPIVersion(
    '2.104',
    currentAPIVersion,
  );

  // Call MenuItems or flatpage as fallback for GTA API Version below 2.104
  const { data: menuItems } = useQuery<MenuItem[], Error>(
    ['header', language],
    () => (isUpperOrEqualCurrentAPIVersion_2_104 ? geMenuItems(language) : getFlatPages(language)),
    {
      enabled: isUpperOrEqualCurrentAPIVersion_2_104 !== null,
      staleTime: ONE_DAY,
    },
  );
  const intl = useIntl();

  const { height = 0 } = useSize(menuNode) ?? {};

  const isDesktopMenu = menuNode.current === null || (height < 100 && height !== 0);

  return { config, intl, menuItems, isDesktopMenu };
};

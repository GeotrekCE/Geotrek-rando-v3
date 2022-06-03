import getNextConfig from 'next/config';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getFlatPages } from 'modules/flatpage/connector';
import { MenuItem } from 'modules/header/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { IntlShape, useIntl } from 'react-intl';
import { FooterConfigInput, FooterConfigOutput, PortalLinkStatic } from './interface';

export const getFooterConfig = (): FooterConfigInput => {
  const {
    publicRuntimeConfig: { footer, footerTopHtml, footerBottomHtml },
  } = getNextConfig();

  return { ...footer, footerTopHtml, footerBottomHtml };
};

export const useFooter = (): { config: FooterConfigOutput; intl: IntlShape } => {
  const { links, ...rest } = getFooterConfig();
  let nextLinks;
  // If the footer config contains `informationID` keys,the app retrieves "flatpages" to get the corresponding label/url
  if (links && links.some(link => 'informationID' in link)) {
    const language = useRouter().locale ?? getDefaultLanguage();
    const { data } = useQuery<MenuItem[], Error>(['header', language], () =>
      getFlatPages(language),
    );
    nextLinks = links
      .map(link => {
        if ('informationID' in link) {
          const page = data?.find(({ id }) => id === link.informationID);
          if (page) {
            return { label: page.title, url: page.url };
          }
          return null;
        }
        return link;
      })
      // If the informationID doesn't match with any flatPage id, it won't be displayed
      .filter(Boolean) as PortalLinkStatic[];
  }
  const intl = useIntl();

  return { config: { links: nextLinks ?? (links as PortalLinkStatic[]), ...rest }, intl };
};

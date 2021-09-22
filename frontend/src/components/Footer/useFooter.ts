import getNextConfig from 'next/config';
import { FooterConfig } from './interface';

const getFooterConfig = (): FooterConfig => {
  const {
    publicRuntimeConfig: { footer },
  } = getNextConfig();

  return footer;
};

export const useFooter = (): { config: FooterConfig } => {
  const config = getFooterConfig();
  return { config };
};

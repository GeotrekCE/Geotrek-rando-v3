import footerConfig from '../../../config/footer.json';
import structureFooterConfig from '../../../customization/config/footer.json';
import { FooterConfig } from './interface';

const getFooterConfig = (): FooterConfig => ({
  ...footerConfig,
  ...structureFooterConfig,
});

export const useFooter = (): { config: FooterConfig } => {
  const config = getFooterConfig();
  return { config };
};

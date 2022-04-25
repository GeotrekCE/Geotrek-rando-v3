import parse from 'html-react-parser';
import { PortalContact } from './PortalContact';
import { PortalLinks } from './PortalLinks';
import { SocialNetworks } from './SocialNetworks';
import { useFooter } from './useFooter';

export const Footer: React.FC = () => {
  const { config, intl } = useFooter();
  const footerTop = config.footerTopHtml[intl.locale] ?? config.footerTopHtml.default;
  const footerBottom = config.footerBottomHtml[intl.locale] ?? config.footerBottomHtml.default;
  return (
    <>
      {footerTop !== undefined && <div id="footer_topHtml">{parse(footerTop)}</div>}
      <div className="bg-black flex flex-col" id="footer">
        <div className="mx-4 desktop:mx-10percent" id="footer_content">
          {config.socialNetworks && <SocialNetworks socialNetworkList={config.socialNetworks} />}
          <div
            id="footer_sections"
            className="
            flex flex-col desktop:flex-row justify-between
            pt-2.5 pb-10 desktop:pt-10 desktop:pb-18"
          >
            {config.contact && <PortalContact {...config.contact} />}
            {config.links && <PortalLinks name="footer.linksSectionTitle" links={config.links} />}
          </div>
        </div>
      </div>
      {footerBottom !== undefined && <div id="footer_bottomHtml">{parse(footerBottom)}</div>}
    </>
  );
};

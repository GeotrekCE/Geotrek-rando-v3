import { PortalContact } from './PortalContact';
import { PortalLinks } from './PortalLinks';
import { SocialNetworks } from './SocialNetworks';
import { useFooter } from './useFooter';

export const Footer: React.FC = () => {
  const { config } = useFooter();
  return (
    <div className="bg-black flex flex-col" id="footer">
      <div className="mx-4 desktop:mx-10percent">
        {config.socialNetworks && <SocialNetworks socialNetworkList={config.socialNetworks} />}
        <div
          className="
          flex flex-col desktop:flex-row justify-between
          pt-2.5 pb-10 desktop:pt-10 desktop:pb-18"
        >
          {config.contact && <PortalContact {...config.contact} />}
          {config.links && <PortalLinks name="footer.linksSectionTitle" links={config.links} />}
        </div>
      </div>
    </div>
  );
};

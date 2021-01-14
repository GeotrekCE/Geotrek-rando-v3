import { LogoButton } from 'components/LogoButton';
import { Twitter } from 'components/Icons/Twitter';
import { Facebook } from 'components/Icons/Facebook';
import { YouTube } from 'components/Icons/YouTube';
import { PortalContact } from '../PortalContact';

interface SocialNetwork {
  id: string;
  url: string;
}
interface HomeFooterProps {
  socialNetworks: SocialNetwork[];
}

const socialNetworksIcons: { [key: string]: React.ReactNode } = {
  twitter: <Twitter size={16} />,
  facebook: <Facebook size={16} />,
  youtube: <YouTube size={16} />,
};

export const HomeFooter: React.FC<HomeFooterProps> = ({ socialNetworks }) => {
  // TODO déplacer les logos dans un composant à part ?
  return (
    <div className="bg-black flex flex-col">
      <div className="mx-4 desktop:mx-40">
        <div
          className="
          flex justify-center space-x-6
          py-4 desktop:py-10
          border-b border-solid border-greySoft"
        >
          {socialNetworks.map(socialNetwork => (
            // Using <a> for external links (<Link /> is only for internal routes with next).
            // target and rel are set so the link opens in a new tab.
            <a
              href={socialNetwork.url}
              key={socialNetwork.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LogoButton>{getSocialNetworkIcon(socialNetwork.id)}</LogoButton>
            </a>
          ))}
        </div>
        <div
          className="
          flex flex-col desktop:block
          pt-3 pb-10 desktop:pt-10 desktop:pb-18"
        >
          <PortalContact
            name="Parc National des Écrins"
            addressLine1="Domaine de Charance"
            addressLine2="05000 Gap"
            number="04 92 40 20 10"
            mail="lesecrins@parcnational.com"
          />
        </div>
      </div>
    </div>
  );
};

const getSocialNetworkIcon = (socialNetworkId: string): React.ReactNode | null => {
  if (Object.keys(socialNetworksIcons).includes(socialNetworkId)) {
    return socialNetworksIcons[socialNetworkId];
  }
  return null;
};

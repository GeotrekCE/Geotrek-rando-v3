import { LogoButton } from 'components/LogoButton';
import { Twitter } from 'components/Icons/Twitter';
import { Facebook } from 'components/Icons/Facebook';
import { YouTube } from 'components/Icons/YouTube';

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
  return (
    <div className="bg-black h-100 flex flex-col">
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

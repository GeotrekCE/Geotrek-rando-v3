import { PortalContact } from '../PortalContact';
import { SocialNetworks } from '../SocialNetworks';

export const HomeFooter: React.FC = () => {
  return (
    <div className="bg-black flex flex-col">
      <div className="mx-4 desktop:mx-40">
        <div
          className="
          flex flex-col desktop:block
          pt-3 pb-10 desktop:pt-10 desktop:pb-18"
        >
          <SocialNetworks
            socialNetworkList={[
              { id: 'facebook', url: 'https://www.facebook.com' },
              { id: 'twitter', url: 'https://www.twitter.com' },
              { id: 'youtube', url: 'https://www.youtube.com' },
            ]}
          />
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

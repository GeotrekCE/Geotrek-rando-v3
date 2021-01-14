import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Layout } from 'components/Layout/Layout';
import { ActivitySearchFilter } from 'components/ActivitySearchFilter';
import HomeCard from './components/HomeCard';
import { HomeSection } from './components/HomeSection';
import {
  Code,
  DescriptionLine,
  DescriptionList,
  HomeContainer,
  HowTo,
  Logo,
  Title,
  TopContainer,
} from './Home.style';
import { HomeFooter } from './components/HomeFooter';
import { useHome } from './useHome';

const HomeUI: FunctionComponent = () => {
  const { config } = useHome();
  return (
    <Layout>
      <HomeContainer>
        <TopContainer backgroundUrl={config.pictureAndText.pictureUrl}>
          {config.pictureAndText.shouldDisplayText && (
            <span className="text-white font-bold text-Mobile-H1 desktop:text-H1 desktop:leading-tight">
              <FormattedMessage id="home.welcome-text" />
            </span>
          )}
        </TopContainer>
        <div
          className="
          relative -top-6 desktop:-top-15
          px-4 desktop:px-40
          space-y-6 desktop:space-y-18"
        >
          <div
            className="
          desktop:flex desktop:justify-center
          mx-4 desktop:mx-40"
          >
            <ActivitySearchFilter />
          </div>
          <HomeCard
            title="Tour des Alpes"
            imagePath="/images/treck-selection.jpg"
            subtitle="Un parcours sur 3 jours à découvrir en famille"
            tag="Sélectionné par le Parc national des Écrins"
            heightMobile={265}
            heightDesktop={265}
          />
          <HomeSection
            title="Randonnées du parc"
            iconUrl="https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg"
          />
          <HomeSection
            title="Parcours en itinérance"
            iconUrl="https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-horse.svg"
          />
          <Logo alt="logo" src="/logo.png" />
          <Title>Welcome to Geotrek</Title>
          <HowTo>
            <DescriptionList>
              <DescriptionLine>
                To create a page or a component, run <Code>yarn generate</Code>.
              </DescriptionLine>
              <DescriptionLine>
                The style is centralized in the <Code>src/stylesheet.ts</Code>. From there, you can
                manage colors, font properties, spacing unit...
              </DescriptionLine>
              <DescriptionLine>
                The displayed data come from a server side populated redux store.
              </DescriptionLine>
            </DescriptionList>
          </HowTo>
          {/* <ListMapContainer>
          <ListContainer>
            <p>Points of Interest</p>
            {POIList && POIList.map(POI => <p key={POI.id}>{POI.description}</p>)}
            <br />
            <p>Treks</p>
            {treksList && treksList.map(trek => <p key={trek.id}>{trek.description}</p>)}
          </ListContainer>
          <MapContainer>
            <Map points={POIList} segments={treksList} />
          </MapContainer>
        </ListMapContainer> */}
        </div>
      </HomeContainer>
      <HomeFooter
        socialNetworks={[
          { id: 'facebook', url: 'https://www.facebook.com' },
          { id: 'twitter', url: 'https://www.twitter.com' },
          { id: 'youtube', url: 'https://www.youtube.com' },
        ]}
      />
    </Layout>
  );
};

export const Home = HomeUI;

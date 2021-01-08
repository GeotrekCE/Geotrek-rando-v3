import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Layout } from 'components/Layout/Layout';
import Button from 'components/Button';
import Map from 'components/Map';
import { ActivitySearchFilter } from 'components/ActivitySearchFilter';
import HomeCard from './components/HomeCard';
import { WrapperProps } from './Home.wrap';
import {
  Code,
  DescriptionLine,
  DescriptionList,
  HomeContainer,
  HowTo,
  ListContainer,
  ListMapContainer,
  Logo,
  MapContainer,
  Title,
  TopContainer,
  WelcomeText,
} from './Home.style';

const HomeUI: FunctionComponent<WrapperProps> = ({
  getPOIList,
  POIList,
  getTreksList,
  treksList,
}) => (
  <Layout>
    <HomeContainer>
      <TopContainer>
        <WelcomeText>
          <FormattedMessage id="home.welcome-text" />
        </WelcomeText>
      </TopContainer>
      <div className="px-4 desktop:px-40 space-y-6 desktop:space-y-18 relative -top-6 desktop:-top-18">
        <ActivitySearchFilter />
        <HomeCard
          title="Tour des Alpes"
          imagePath="/images/treck-selection.jpg"
          subtitle="Un parcours sur 3 jours à découvrir en famille"
          tag="Sélectionné par le Parc national des Écrins"
          heightMobile={265}
          heightDesktop={265}
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
            <Button onClick={() => Promise.all([getTreksList(), getPOIList()])}>
              Click here to load POIs and Treks from 2nd page from the front
            </Button>
          </DescriptionList>
        </HowTo>
        <ListMapContainer>
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
        </ListMapContainer>
      </div>
    </HomeContainer>
  </Layout>
);

export const Home = HomeUI;

import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Layout } from 'components/Layout/Layout';
import { ActivitySearchFilter } from 'components/ActivitySearchFilter';
import HomeCard from './components/HomeCard';
import { HomeSection } from './components/HomeSection';
import { HomeContainer, TopContainer } from './Home.style';
import { HomeFooter } from './components/HomeFooter';
import { useHome } from './useHome';

const HomeUI: FunctionComponent = () => {
  const { config, activitySuggestions } = useHome();
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
            activitySuggestions={activitySuggestions}
          />
          <HomeSection
            title="Parcours en itinérance"
            iconUrl="https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-horse.svg"
            activitySuggestions={activitySuggestions}
          />

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
      <HomeFooter />
    </Layout>
  );
};

export const Home = HomeUI;

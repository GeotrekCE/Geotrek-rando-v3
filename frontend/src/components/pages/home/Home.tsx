import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import parse from 'html-react-parser';

import homeTopHtml from 'customization/html/homeTop.html';
import homeBottomHtml from 'customization/html/homeBottom.html';

import { Layout } from 'components/Layout/Layout';
import { ActivitySearchFilter } from 'components/ActivitySearchFilter';
import { PageHead } from 'components/PageHead';
import { Footer } from 'components/Footer';
import HomeCard from './components/HomeCard';
import { HomeSection } from './components/HomeSection';
import { HomeContainer, TopContainer } from './Home.style';
import { useHome } from './useHome';

const HomeUI: FunctionComponent = () => {
  const { config, activitySuggestionCategories } = useHome();

  const contentContainerClassname = `relative ${
    config.activityBar.shouldDisplay ? '-top-6 desktop:-top-15' : 'pt-6 desktop:pt-18'
  }`;

  const intl = useIntl();
  return (
    <div>
      <PageHead
        title={intl.formatMessage({ id: 'home.title' })}
        description={intl.formatMessage({ id: 'home.description' })}
      />
      <Layout>
        <HomeContainer>
          <TopContainer backgroundUrl={config.pictureAndText.pictureUrl} id="cover_image">
            {config.pictureAndText.shouldDisplayText && (
              <span className="text-white font-bold text-Mobile-H1 desktop:text-H1 desktop:leading-tight">
                <FormattedMessage id="home.welcome-text" />
              </span>
            )}
          </TopContainer>
          <div className={contentContainerClassname}>
            {config.activityBar.shouldDisplay && (
              <div
                className={`desktop:flex desktop:justify-center ${classNameHomeChild}`}
                id="activities_bar"
              >
                <ActivitySearchFilter />
              </div>
            )}

            <HomeCard
              className={classNameHomeChild}
              title="Tour des Alpes"
              imagePath="/images/treck-selection.jpg"
              subtitle="Un parcours sur 3 jours à découvrir en famille"
              tag="Sélectionné par le Parc national des Écrins"
              heightMobile={265}
              heightDesktop={265}
            />
            <div className={classNameHomeChild}>{parse(homeTopHtml)}</div>
            {activitySuggestionCategories.map(suggestionCategory => (
              <HomeSection
                title={intl.formatMessage({ id: suggestionCategory.titleTranslationId })}
                iconUrl={suggestionCategory.iconUrl}
                key={suggestionCategory.titleTranslationId}
                activitySuggestions={suggestionCategory.suggestions}
              />
            ))}
            <div className={classNameHomeChild}>{parse(homeBottomHtml)}</div>
          </div>
        </HomeContainer>
        <Footer />
      </Layout>
    </div>
  );
};

const classNameHomeChild = 'mx-4 desktop:mx-10percent mb-6 desktop:mb-18';

export const Home = HomeUI;

import { ActivitySearchFilter } from 'components/ActivitySearchFilter';
import { Footer } from 'components/Footer';
import { Layout } from 'components/Layout/Layout';
import { PageHead } from 'components/PageHead';
import parse from 'html-react-parser';
import getNextConfig from 'next/config';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { BannerWithAsset } from './components/BannerWithAsset';
import { HomeSection } from './components/HomeSection';
import { HomeContainer } from './Home.style';
import { useHome } from './useHome';

const {
  publicRuntimeConfig: { homeBottomHtml, homeTopHtml },
} = getNextConfig();

const HomeUI: FunctionComponent = () => {
  const { config, suggestions } = useHome();

  const contentContainerClassname = `relative ${
    config.activityBar.shouldDisplay ? '-top-6 desktop:-top-15' : 'pt-6 desktop:pt-18'
  }`;

  const intl = useIntl();

  const homeTop = homeTopHtml[intl.locale] ?? homeTopHtml.default;
  const homeBottom = homeBottomHtml[intl.locale] ?? homeBottomHtml.default;

  return (
    <>
      <PageHead
        title={intl.formatMessage({ id: 'home.title' })}
        description={intl.formatMessage({ id: 'home.description' })}
      />
      <Layout>
        <HomeContainer>
          <BannerWithAsset
            shouldDisplayText={config.welcomeBanner.shouldDisplayText}
            carouselUrls={config.welcomeBanner.carouselUrls}
            pictureUrl={config.welcomeBanner.pictureUrl}
            videoUrl={config.welcomeBanner.videoUrl}
          />
          <div id="home_content" className={contentContainerClassname}>
            {config.activityBar.shouldDisplay && (
              <div
                className={`desktop:flex desktop:justify-center ${classNameHomeChild}`}
                id="home_activitiesBar"
              >
                <ActivitySearchFilter />
              </div>
            )}
            {homeTop !== undefined && (
              <div id="home_topHtml" className={classNameHomeChild}>
                {parse(homeTop)}
              </div>
            )}
            {suggestions
              .filter(({ results }) => results.length > 0)
              .map(({ titleTranslationId, iconUrl, results, type }) => (
                <HomeSection
                  title={intl.formatMessage({ id: titleTranslationId })}
                  iconUrl={iconUrl}
                  key={titleTranslationId}
                  results={results}
                  type={type}
                />
              ))}
            {homeBottom !== undefined && (
              <div id="home_bottomHtml" className={classNameHomeChild}>
                {parse(homeBottom)}
              </div>
            )}
          </div>
        </HomeContainer>
        <Footer />
      </Layout>
    </>
  );
};

const classNameHomeChild = 'mx-4 desktop:mx-10percent mb-6 desktop:mb-18';

export const Home = HomeUI;

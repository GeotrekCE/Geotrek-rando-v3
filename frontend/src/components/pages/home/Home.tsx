import { ActivitySearchFilter } from 'components/ActivitySearchFilter';
import { Footer } from 'components/Footer';
import { PageHead } from 'components/PageHead';
import getNextConfig from 'next/config';
import { useIntl } from 'react-intl';
import { HtmlParser } from 'components/HtmlParser';
import { BannerWithAsset } from './components/BannerWithAsset';
import { HomeSection } from './components/HomeSection';
import { HomeContainer } from './Home.style';
import { useHome } from './useHome';

const {
  publicRuntimeConfig: { homeBottomHtml, homeTopHtml },
} = getNextConfig();

const HomeUI: React.FC = () => {
  const {
    config: { activityBar, welcomeBanner },
    suggestions,
  } = useHome();

  const contentContainerClassname = `relative ${
    activityBar.shouldDisplay ? '-top-6 desktop:-top-15' : 'pt-6 desktop:pt-18'
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
      <HomeContainer id="home_container">
        <BannerWithAsset {...welcomeBanner} />
        <div id="home_content" className={contentContainerClassname}>
          {activityBar.shouldDisplay && (
            <div
              className={`desktop:flex desktop:justify-center ${classNameHomeChild}`}
              id="home_activitiesBar"
            >
              <ActivitySearchFilter
                itemsToDisplayBeforeTruncation={activityBar.numberOfItemsBeforeTruncation}
              />
            </div>
          )}
          {homeTop !== undefined && (
            <div id="home_topHtml" className={classNameHomeChild}>
              <HtmlParser template={homeTop} />
            </div>
          )}
          {suggestions
            .filter(({ results }) => results.length > 0)
            .map(({ titleTranslationId, iconUrl, results }) => (
              <HomeSection
                className="mx-4 desktop:mx-10percent"
                title={intl.formatMessage({ id: titleTranslationId })}
                iconUrl={iconUrl}
                key={titleTranslationId}
                results={results}
                asColumn
              />
            ))}
          {homeBottom !== undefined && (
            <div id="home_bottomHtml" className={classNameHomeChild}>
              <HtmlParser template={homeBottom} />
            </div>
          )}
        </div>
      </HomeContainer>
      <Footer />
    </>
  );
};

const classNameHomeChild = 'mx-4 desktop:mx-10percent mb-6 desktop:mb-18';

export const Home = HomeUI;

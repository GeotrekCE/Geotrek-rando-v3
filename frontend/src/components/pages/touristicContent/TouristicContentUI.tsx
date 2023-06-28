import { Modal } from 'components/Modal';
import Loader from 'components/Loader';
import { useMediaPredicate } from 'react-media-hook';
import parse from 'html-react-parser';
import { FormattedMessage } from 'react-intl';
import { TouristicContentMapDynamicComponent } from 'components/Map';
import { PageHead } from 'components/PageHead';
import { Footer } from 'components/Footer';
import { OpenMapButton } from 'components/OpenMapButton';
import { MobileMapContainer } from 'components/pages/search';
import { getGlobalConfig } from 'modules/utils/api.config';
import useHasMounted from 'hooks/useHasMounted';
import { ImageWithLegend } from 'components/ImageWithLegend';
import { useTouristicContent } from './useTouristicContent';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { DetailsSection } from '../details/components/DetailsSection';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsSource } from '../details/components/DetailsSource';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { DetailsHeaderMobile, marginDetailsChild } from '../details/Details';
import { HtmlText } from '../details/utils';
import { DetailsMeteoWidget } from '../details/components/DetailsMeteoWidget';
import { getDetailsConfig } from '../details/config';
import { DetailsHeader } from '../details/components/DetailsHeader';

interface TouristicContentUIProps {
  touristicContentUrl: string | string[] | undefined;
  language: string;
}

export const TouristicContentUI: React.FC<TouristicContentUIProps> = ({
  touristicContentUrl,
  language,
}) => {
  const {
    id,
    touristicContent,
    isLoading,
    refetch,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    sectionsReferences,
    sectionRef,
  } = useTouristicContent(touristicContentUrl, language);

  const isMobile = useMediaPredicate('(max-width: 1024px)');
  const hasNavigator = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);

  const { sections } = getDetailsConfig();
  const sectionsTouristicContent = sections.touristicContent.filter(({ display }) => display);

  return (
    <>
      <PageHead
        title={touristicContent?.name}
        description={touristicContent ? touristicContent.descriptionTeaser : ''}
        sharingImageUrl={touristicContent?.attachments?.[0]?.url}
      />
      {touristicContent === undefined ? (
        <>
          {isLoading ? (
            <Loader className="absolute inset-0" />
          ) : (
            <ErrorFallback refetch={refetch} />
          )}
        </>
      ) : (
        <>
          <div id="details_container">
            <DetailsHeader
              sectionsReferences={sectionsReferences}
              details={touristicContent}
              type={'TOURISTIC_CONTENT'}
            />
            {touristicContent.name !== undefined && (
              <DetailsHeaderMobile title={touristicContent.name} />
            )}
            <div id="touristicContent_page" className="flex flex-1">
              <div
                id="touristicContent_informations"
                className="flex flex-col w-full -top-detailsHeaderMobile desktop:top-0 desktop:w-3/5"
              >
                <OpenMapButton displayMap={displayMobileMap} />
                <Modal>
                  {({ isFullscreen, toggleFullscreen }) => (
                    <div
                      id="touristicContent_cover"
                      className={!isFullscreen ? 'desktop:h-coverDetailsDesktop' : 'h-full'}
                    >
                      {touristicContent.attachments.length > 1 && hasNavigator ? (
                        <DetailsCoverCarousel
                          attachments={touristicContent.attachments}
                          classNameImage={isFullscreen ? 'object-contain' : ''}
                          onClickImage={toggleFullscreen}
                        />
                      ) : (
                        <ImageWithLegend
                          attachment={touristicContent.attachments[0]}
                          classNameImage={isFullscreen ? 'object-contain' : ''}
                          onClick={toggleFullscreen}
                        />
                      )}
                    </div>
                  )}
                </Modal>
                <div
                  id="touristicContent_text"
                  className="desktop:py-0
                relative -top-6 desktop:-top-9
                flex flex-col"
                >
                  <DetailsTopIcons
                    details={touristicContent}
                    practice={{
                      id: 0,
                      pictogramUri: touristicContent.category.pictogramUri,
                      label: touristicContent.category.label,
                    }}
                    type={'TOURISTIC_CONTENT'}
                  />

                  {sectionsTouristicContent.map(section => {
                    if (section.name === 'presentation') {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsPreview
                            className={marginDetailsChild}
                            informations={{
                              duration: null,
                              distance: null,
                              elevation: null,
                              difficulty: null,
                              courseType: null,
                              networks: [],
                              types: touristicContent.types,
                              logoUri: touristicContent.logoUri ?? undefined,
                            }}
                            place={touristicContent.place}
                            tags={touristicContent.themes}
                            title={touristicContent.name}
                            teaser={touristicContent.descriptionTeaser}
                            ambiance={touristicContent.description}
                            details={touristicContent}
                            type={'TOURISTIC_CONTENT'}
                            id={id}
                          />
                        </section>
                      );
                    }
                    if (
                      section.name === 'practicalInformations' &&
                      touristicContent.practicalInfo
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="details_practicalInformations"
                            titleId="details.practicalInformations"
                            className={marginDetailsChild}
                          >
                            <HtmlText>{parse(touristicContent.practicalInfo)}</HtmlText>
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (section.name === 'accessibility' && touristicContent.accessibility) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="details_accessibility"
                            titleId="details.accessibility"
                            className={marginDetailsChild}
                          >
                            <HtmlText>{parse(touristicContent.accessibility)}</HtmlText>
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (
                      section.name === 'contact' &&
                      (!!touristicContent.contact?.length ||
                        !!touristicContent.email?.length ||
                        !!touristicContent.website?.length)
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="touristicContent_contact"
                            titleId="touristicContent.contact"
                            className={marginDetailsChild}
                          >
                            <HtmlText>{parse(touristicContent.contact)}</HtmlText>
                            {!!touristicContent.email?.length && (
                              <div className="mt-2 desktop:mt-4">
                                <span className="block">
                                  <FormattedMessage id="touristicContent.email" /> :
                                </span>
                                <a
                                  href={`mailto:${touristicContent.email}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary1 underline hover:text-primary1-light focus:text-primary1-light"
                                >
                                  {touristicContent.email}
                                </a>
                              </div>
                            )}
                            {!!touristicContent.website?.length && (
                              <div className="mt-2 desktop:mt-4">
                                <span className="block">
                                  <FormattedMessage id="touristicContent.website" /> :
                                </span>
                                <a
                                  href={touristicContent.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary1 underline
                          hover:text-primary1-light focus:text-primary1-light"
                                >
                                  {touristicContent.website}
                                </a>
                              </div>
                            )}
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (
                      section.name === 'forecastWidget' &&
                      getGlobalConfig().enableMeteoWidget &&
                      touristicContent.cities_raw?.[0]
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          {hasNavigator && (
                            <DetailsSection
                              htmlId="details_forecastWidget"
                              className={marginDetailsChild}
                            >
                              <DetailsMeteoWidget code={touristicContent.cities_raw[0]} />
                            </DetailsSection>
                          )}
                        </section>
                      );
                    }

                    if (section.name === 'source' && touristicContent.sources.length > 0) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="touristicContent_source"
                            titleId="details.source"
                            className={marginDetailsChild}
                          >
                            {touristicContent.sources.map((source, i) => (
                              <DetailsSource
                                key={i}
                                name={source.name}
                                website={source.website}
                                pictogramUri={source.pictogramUri}
                              />
                            ))}
                          </DetailsSection>
                        </section>
                      );
                    }

                    return null;
                  })}
                </div>
                <Footer />
              </div>
              {!isMobile && (
                <div
                  id="touristicContent_map"
                  className="desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar"
                >
                  <TouristicContentMapDynamicComponent
                    type="DESKTOP"
                    bbox={touristicContent.bbox}
                    touristicContentGeometry={{
                      geometry: touristicContent.geometry,
                      pictogramUri: touristicContent.category.pictogramUri,
                      name: touristicContent.name,
                      id: touristicContent.id,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          {isMobile && (
            <MobileMapContainer
              id="touristicContent_mobileMap"
              className={`desktop:hidden fixed right-0 left-0 h-full z-map ${
                mobileMapState === 'HIDDEN' ? 'invisible' : 'flex'
              }`}
              displayState={mobileMapState}
            >
              <TouristicContentMapDynamicComponent
                type="MOBILE"
                bbox={touristicContent.bbox}
                touristicContentGeometry={{
                  geometry: touristicContent.geometry,
                  pictogramUri: touristicContent.category.pictogramUri,
                  name: touristicContent.name,
                  id: touristicContent.id,
                }}
                hideMap={hideMobileMap}
              />
            </MobileMapContainer>
          )}
        </>
      )}
    </>
  );
};

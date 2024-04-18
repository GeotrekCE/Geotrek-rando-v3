import { Modal } from 'components/Modal';
import { DetailsCardSection } from 'components/pages/details/components/DetailsCardSection';
import { DetailsDescription } from 'components/pages/details/components/DetailsDescription';
import { DetailsHeader } from 'components/pages/details/components/DetailsHeader';
import { DetailsSection } from 'components/pages/details/components/DetailsSection';
import { DetailsSource } from 'components/pages/details/components/DetailsSource';
import { DetailsHeaderMobile, marginDetailsChild } from 'components/pages/details/Details';
import { useOnScreenSection } from 'components/pages/details/hooks/useHighlightedSection';
import {
  generateTouristicContentUrl,
  templatesVariablesAreDefinedAndUsed,
} from 'components/pages/details/utils';
import { VisibleSectionProvider } from 'components/pages/details/VisibleSectionContext';
import { useTouristicEvent } from 'components/pages/touristicEvent/useTouristicEvent';
import { useMemo, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'components/Loader';
import { useMediaPredicate } from 'react-media-hook';
import { sizes } from 'stylesheet';
import { DetailsMapDynamicComponent } from 'components/Map';
import { PageHead } from 'components/PageHead';
import { Footer } from 'components/Footer';
import { OpenMapButton } from 'components/OpenMapButton';
import useHasMounted from 'hooks/useHasMounted';
import { ImageWithLegend } from 'components/ImageWithLegend';
import { cn } from 'services/utils/cn';
import { HtmlParser } from 'components/HtmlParser';
import { cleanHTMLElementsFromString } from '../../../modules/utils/string';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { useDetailsSections } from '../details/useDetailsSections';
import { DetailsFiles } from '../details/components/DetailsFiles';

interface Props {
  touristicEventUrl: string | string[] | undefined;
  language: string;
}

export const TouristicEventUIWithoutContext: React.FC<Props> = ({
  touristicEventUrl,
  language,
}) => {
  const {
    id,
    touristicEventContent,
    isLoading,
    refetch,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    sectionsReferences,
    sectionsPositions,
    sectionRef,
  } = useTouristicEvent(touristicEventUrl, language);

  const intl = useIntl();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  /** Ref of the parent of all sections */
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const hasNavigator = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);

  const { sections, anchors } = useDetailsSections('touristicEvent');

  useOnScreenSection({
    sectionsPositions,
    // The scroll offset is the height above the sections' container minus the headers size
    // (we want the element detection to trigger when an element top reaches the header's bottom not the windows' top)
    // Note that this scrollOffset is necessary because the sections' container
    // position is relative, therefore its childrens' boundingClientRect are computed
    // relative to the relative parent.
    scrollOffset:
      (sectionsContainerRef.current?.offsetTop ?? 0) -
      sizes.desktopHeader -
      sizes.detailsHeaderDesktop,
  });

  return useMemo(
    () => (
      <>
        <PageHead
          title={touristicEventContent?.name}
          description={cleanHTMLElementsFromString(touristicEventContent?.description)}
          sharingImageUrl={touristicEventContent?.images?.[0]?.url}
        />
        {touristicEventContent === undefined ? (
          <>
            {isLoading ? (
              <Loader className="absolute inset-0" />
            ) : (
              <ErrorFallback refetch={refetch} />
            )}
          </>
        ) : (
          <div id="details_container">
            <DetailsHeader
              anchors={anchors}
              sectionsReferences={sectionsReferences}
              details={touristicEventContent}
              type={'TOURISTIC_EVENT'}
            />
            {touristicEventContent.name !== undefined && (
              <DetailsHeaderMobile title={touristicEventContent.name} />
            )}
            <div id="outdoorCourseContent_page" className="flex flex-1">
              <div
                id="outdoorCourseContent_informations"
                className="flex flex-col w-full relative -top-detailsHeaderMobile desktop:top-0 desktop:w-3/5"
              >
                <OpenMapButton displayMap={displayMobileMap} />
                <div className="desktop:h-coverDetailsDesktop">
                  <Modal>
                    {({ toggleFullscreen, isFullscreen }) => (
                      <div
                        id="outdoorCourseContent_cover"
                        className={!isFullscreen ? 'desktop:h-coverDetailsDesktop' : 'h-full'}
                      >
                        {touristicEventContent.images.length > 1 && hasNavigator ? (
                          <DetailsCoverCarousel
                            images={touristicEventContent.images}
                            classNameImage={isFullscreen ? 'object-contain' : ''}
                            onClickImage={toggleFullscreen}
                          />
                        ) : (
                          <ImageWithLegend
                            image={touristicEventContent.images[0]}
                            classNameImage={isFullscreen ? 'object-contain' : ''}
                            onClick={toggleFullscreen}
                          />
                        )}
                      </div>
                    )}
                  </Modal>
                </div>
                <div
                  id="touristicEventContent_text"
                  className="desktop:py-0
                relative -top-6 desktop:-top-9
                flex flex-col"
                  ref={sectionsContainerRef}
                >
                  <DetailsTopIcons
                    details={touristicEventContent}
                    practice={{
                      id: 0,
                      pictogramUri: touristicEventContent.category.pictogramUri,
                      label: touristicEventContent.category.label,
                    }}
                    type={'TOURISTIC_EVENT'}
                  />

                  {sections.map(section => {
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
                              logoUri: touristicEventContent.logoUri ?? undefined,
                              participantNumber: touristicEventContent.participantNumber,
                              meetingPoint: touristicEventContent.meetingPoint,
                              duration: [
                                touristicEventContent.meetingTime,
                                touristicEventContent.duration,
                              ].join(' - '),
                              date: {
                                beginDate: touristicEventContent.informations.beginDate,
                                endDate: touristicEventContent.informations.endDate,
                              },
                            }}
                            place={touristicEventContent.place}
                            tags={touristicEventContent.themes}
                            title={touristicEventContent.name}
                            teaser={touristicEventContent.descriptionTeaser}
                            ambiance={''}
                            details={touristicEventContent}
                            type={'TOURISTIC_EVENT'}
                            id={id}
                          />
                        </section>
                      );
                    }

                    if (
                      section.name === 'medias' &&
                      touristicEventContent.filesFromAttachments.length > 0
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection htmlId="details_medias" className={marginDetailsChild}>
                            <DetailsFiles files={touristicEventContent.filesFromAttachments} />
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (section.name === 'description' && touristicEventContent.description) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsDescription
                            descriptionHtml={touristicEventContent.description}
                            className={marginDetailsChild}
                            cities={touristicEventContent.cities}
                          />
                        </section>
                      );
                    }
                    if (section.name === 'practicalInformations') {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsDescription
                            id="details_practicalInformations"
                            descriptionHtml={touristicEventContent.contact ?? ''}
                            className={marginDetailsChild}
                            title={<FormattedMessage id="details.informationDesks" />}
                            email={touristicEventContent.email}
                            website={touristicEventContent.website}
                          />
                          {touristicEventContent.accessibility && (
                            <div>
                              <DetailsDescription
                                descriptionHtml={touristicEventContent.accessibility ?? ''}
                                className={marginDetailsChild}
                                title={<FormattedMessage id="details.accessibility" />}
                              />
                            </div>
                          )}

                          {touristicEventContent.organizer && (
                            <div>
                              <DetailsDescription
                                descriptionHtml={touristicEventContent.organizer ?? ''}
                                className={marginDetailsChild}
                                title={<FormattedMessage id="details.organizer" />}
                              />
                            </div>
                          )}

                          {touristicEventContent.speaker && (
                            <div>
                              <DetailsDescription
                                descriptionHtml={touristicEventContent.speaker ?? ''}
                                className={marginDetailsChild}
                                title={<FormattedMessage id="details.speaker" />}
                              />
                            </div>
                          )}

                          {touristicEventContent.targetAudience && (
                            <div>
                              <DetailsDescription
                                descriptionHtml={touristicEventContent.targetAudience ?? ''}
                                className={marginDetailsChild}
                                title={<FormattedMessage id="details.targetAudience" />}
                              />
                            </div>
                          )}

                          {touristicEventContent.practicalInfo && (
                            <div>
                              <DetailsDescription
                                descriptionHtml={touristicEventContent.practicalInfo ?? ''}
                                className={marginDetailsChild}
                                title={<FormattedMessage id="details.practicalInfo" />}
                              />
                            </div>
                          )}

                          {touristicEventContent.booking && (
                            <div>
                              <DetailsDescription
                                descriptionHtml={touristicEventContent.booking ?? ''}
                                className={marginDetailsChild}
                                title={<FormattedMessage id="details.booking" />}
                              />
                            </div>
                          )}
                        </section>
                      );
                    }

                    if (section.name === 'source' && touristicEventContent.sources.length > 0) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="details_source"
                            titleId="details.source"
                            className={marginDetailsChild}
                          >
                            {touristicEventContent.sources.map((source, i) => (
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

                    if (
                      section.name === 'touristicContent' &&
                      touristicEventContent.touristicContents.length > 0
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsCardSection
                            htmlId="details_touristicContent"
                            title={intl.formatMessage({ id: 'details.touristicContent' })}
                            displayBadge
                            generateUrlFunction={generateTouristicContentUrl}
                            detailsCards={touristicEventContent.touristicContents.map(
                              touristicContent => ({
                                id: `${touristicContent.id}`,
                                name: touristicContent.name ?? '',
                                place: touristicContent.category.label,
                                description: touristicContent.descriptionTeaser,
                                thumbnails: touristicContent.thumbnails,
                                images: touristicContent.images,
                                iconUri: touristicContent.category.pictogramUri,
                                iconName: touristicContent.category.label,
                              }),
                            )}
                            type="TOURISTIC_CONTENT"
                          />
                        </section>
                      );
                    }

                    // Custom HTML templates
                    if (
                      templatesVariablesAreDefinedAndUsed({
                        template: section.template,
                        id: touristicEventContent.id.toString(),
                        cityCode: touristicEventContent.cities_raw?.[0],
                      })
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId={`details_${section.name}`}
                            titleId={`details.${section.name}`}
                            className={marginDetailsChild}
                          >
                            <HtmlParser
                              template={section.template}
                              id={touristicEventContent.id.toString()}
                              type="trek"
                              cityCode={touristicEventContent.cities_raw[0]}
                            />
                          </DetailsSection>
                        </section>
                      );
                    }

                    return null;
                  })}
                </div>
                <Footer />
              </div>
              <div
                id="touristicEvent_map"
                className={cn(
                  'fixed inset-0 z-map left-full w-full transition',
                  'desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:left-auto desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar',
                  mobileMapState === 'DISPLAYED'
                    ? '-translate-x-full desktop:translate-x-0'
                    : 'translate-x-0',
                )}
              >
                <DetailsMapDynamicComponent
                  hasZoomControl={!isMobile}
                  eventGeometry={{
                    geometry: touristicEventContent.geometry,
                    pictogramUri: touristicEventContent.category.pictogramUri,
                    name: touristicEventContent.name,
                    id: touristicEventContent.id,
                  }}
                  poiPoints={[]}
                  bbox={touristicEventContent.bbox}
                  trekChildrenGeometries={[]}
                  touristicContentPoints={touristicEventContent.touristicContents
                    .filter(touristicContent => touristicContent.geometry !== null)
                    .map(touristicContent => ({
                      // It's ok to ignore this rule, we filtered null values 2 lines above
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      geometry: touristicContent.geometry!,
                      pictogramUri: touristicContent.category.pictogramUri,
                      name: touristicContent.name,
                      id: `DETAILS-TOURISTIC_CONTENT-${touristicContent.id}`,
                    }))}
                  sensitiveAreas={[]}
                  trekId={Number(id)}
                  hideMap={hideMobileMap}
                />
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [touristicEventContent, isLoading, mobileMapState, hasNavigator],
  );
};

export const TouristicEventUI: React.FC<Props> = props => {
  return (
    <VisibleSectionProvider>
      <TouristicEventUIWithoutContext
        touristicEventUrl={props.touristicEventUrl}
        language={props.language}
      />
    </VisibleSectionProvider>
  );
};

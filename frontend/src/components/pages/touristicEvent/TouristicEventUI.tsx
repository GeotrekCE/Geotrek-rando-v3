import { Layout } from 'components/Layout/Layout';
import { Modal } from 'components/Modal';
import { DetailsAdvice } from 'components/pages/details/components/DetailsAdvice';
import { DetailsCardSection } from 'components/pages/details/components/DetailsCardSection';
import { DetailsDescription } from 'components/pages/details/components/DetailsDescription';
import { DetailsHeader } from 'components/pages/details/components/DetailsHeader';
import { DetailsInformationDesk } from 'components/pages/details/components/DetailsInformationDesk';
import { DetailsSection } from 'components/pages/details/components/DetailsSection';
import { DetailsSource } from 'components/pages/details/components/DetailsSource';
import { DetailsHeaderMobile, marginDetailsChild } from 'components/pages/details/Details';
import { useOnScreenSection } from 'components/pages/details/hooks/useHighlightedSection';
import { generateTouristicContentUrl } from 'components/pages/details/utils';
import { VisibleSectionProvider } from 'components/pages/details/VisibleSectionContext';
import { OutdoorSiteChildrenSection } from 'components/pages/site/components/OutdoorSiteChildrenSection';
import { useOutdoorCourse } from 'components/pages/site/useOutdoorCourse';
import { useTouristicEvent } from 'components/pages/touristicEvent/useTouristicEvent';
import React, { useMemo, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'react-loader';
import { useMediaPredicate } from 'react-media-hook';
import { colorPalette, sizes, zIndex } from 'stylesheet';
import { DetailsMapDynamicComponent } from 'components/Map';
import { PageHead } from 'components/PageHead';
import { Footer } from 'components/Footer';
import { OpenMapButton } from 'components/OpenMapButton';
import { MobileMapContainer } from 'components/pages/search';
import { getGlobalConfig } from 'modules/utils/api.config';
import { cleanHTMLElementsFromString } from '../../../modules/utils/string';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { ImageWithLegend } from '../details/components/DetailsCoverCarousel/DetailsCoverCarousel';
import { DetailsMeteoWidget } from '../details/components/DetailsMeteoWidget';

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
    setPreviewRef,
    setDescriptionRef,
    setPracticalInformationsRef,
    setTouristicContentsRef,
  } = useTouristicEvent(touristicEventUrl, language);

  const intl = useIntl();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  /** Ref of the parent of all sections */
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

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
          sharingImageUrl={
            touristicEventContent !== undefined && touristicEventContent.attachments.length > 0
              ? touristicEventContent.attachments[0].url
              : undefined
          }
        />
        {touristicEventContent === undefined ? (
          isLoading ? (
            <Loader
              loaded={!isLoading}
              options={{
                top: `${sizes.desktopHeader + sizes.filterBar}px`,
                color: colorPalette.primary1,
                zIndex: zIndex.loader,
              }}
            />
          ) : (
            <ErrorFallback refetch={refetch} />
          )
        ) : (
          <>
            <Layout>
              <DetailsHeader
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
                  <Modal>
                    {({ toggleFullscreen, isFullscreen }) => (
                      <div
                        id="outdoorCourseContent_cover"
                        className={!isFullscreen ? 'desktop:h-coverDetailsDesktop' : 'h-full'}
                      >
                        {touristicEventContent.attachments.length > 1 &&
                        navigator &&
                        navigator?.onLine ? (
                          <DetailsCoverCarousel
                            attachments={touristicEventContent.attachments}
                            onClickImage={toggleFullscreen}
                          />
                        ) : (
                          <ImageWithLegend
                            attachment={touristicEventContent.attachments[0]}
                            onClick={toggleFullscreen}
                          />
                        )}
                      </div>
                    )}
                  </Modal>
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
                        pictogram: touristicEventContent.typeEvent.pictogram,
                        name: touristicEventContent.typeEvent.type,
                      }}
                      type={'TOURISTIC_EVENT'}
                    />

                    <div ref={setPreviewRef} id="details_preview_ref">
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
                            beginDate: touristicEventContent.beginDate,
                            endDate: touristicEventContent.endDate,
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
                    </div>

                    {touristicEventContent.description && (
                      <div ref={setDescriptionRef} id="details_description_ref">
                        <DetailsDescription
                          descriptionHtml={touristicEventContent.description}
                          className={marginDetailsChild}
                          cities={touristicEventContent.cities}
                        />
                      </div>
                    )}

                    <div ref={setPracticalInformationsRef}>
                      <DetailsDescription
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

                      {getGlobalConfig().enableMeteoWidget &&
                        navigator && navigator.onLine &&
                        touristicEventContent.cities_raw &&
                        touristicEventContent.cities_raw[0] && (
                          <DetailsSection>
                            <DetailsMeteoWidget code={touristicEventContent.cities_raw[0]} />
                          </DetailsSection>
                        )}

                      {touristicEventContent.sources.length > 0 && (
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
                      )}
                    </div>

                    {touristicEventContent.touristicContents.length > 0 && (
                      <div ref={setTouristicContentsRef} id="details_touristicContent_ref">
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
                              thumbnailUris: touristicContent.thumbnailUris,
                              attachments: touristicContent.attachments,
                              iconUri: touristicContent.category.pictogramUri,
                              iconName: touristicContent.category.label,
                              logoUri: touristicContent.logoUri ?? undefined,
                            }),
                          )}
                          type="TOURISTIC_CONTENT"
                        />
                      </div>
                    )}
                  </div>
                  <Footer />
                </div>
                {!isMobile && (
                  <div
                    id="details_mapContainer"
                    className="desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar"
                  >
                    <DetailsMapDynamicComponent
                      type="DESKTOP"
                      eventGeometry={{
                        geometry: touristicEventContent.geometry,
                        pictogramUri: touristicEventContent.typeEvent.pictogram,
                        name: touristicEventContent.name,
                        id: touristicEventContent.id,
                      }}
                      poiPoints={[]}
                      bbox={touristicEventContent.bbox}
                      trekChildrenGeometry={[]}
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
                    />
                  </div>
                )}
              </div>
            </Layout>

            {isMobile && (
              <MobileMapContainer
                id="outdoorCourseContent_mobileMap"
                className={`desktop:hidden fixed right-0 left-0 h-full z-map ${
                  mobileMapState === 'HIDDEN' ? 'invisible' : 'flex'
                }`}
                displayState={mobileMapState}
              >
                <DetailsMapDynamicComponent
                  type="MOBILE"
                  eventGeometry={{
                    geometry: touristicEventContent.geometry,
                    pictogramUri: touristicEventContent.typeEvent.pictogram,
                    name: touristicEventContent.name,
                    id: touristicEventContent.id,
                  }}
                  poiPoints={[]}
                  bbox={touristicEventContent.bbox}
                  trekChildrenGeometry={[]}
                  touristicContentPoints={touristicEventContent.touristicContents
                    .filter(touristicContent => touristicContent.geometry !== null)
                    .map(touristicContent => ({
                      // It's ok to ignore this rule, we filtered null values 2 lines above
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      geometry: touristicContent.geometry!,
                      pictogramUri: touristicContent.category.pictogramUri,
                      name: touristicContent.name,
                      id: `${touristicContent.id}`,
                    }))}
                  hideMap={hideMobileMap}
                  trekId={Number(id)}
                />
              </MobileMapContainer>
            )}
          </>
        )}
      </>
    ),
    [touristicEventContent, isLoading, mobileMapState, sectionsPositions],
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

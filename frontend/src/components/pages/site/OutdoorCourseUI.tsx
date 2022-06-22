import parse from 'html-react-parser';
import { Layout } from 'components/Layout/Layout';
import { Modal } from 'components/Modal';
import { DetailsAdvice } from 'components/pages/details/components/DetailsAdvice';
import { DetailsCardSection } from 'components/pages/details/components/DetailsCardSection';
import { DetailsDescription } from 'components/pages/details/components/DetailsDescription';
import { DetailsHeader } from 'components/pages/details/components/DetailsHeader';
import { DetailsSection } from 'components/pages/details/components/DetailsSection';
import { DetailsHeaderMobile, marginDetailsChild } from 'components/pages/details/Details';
import { useOnScreenSection } from 'components/pages/details/hooks/useHighlightedSection';
import { generateTouristicContentUrl, HtmlText } from 'components/pages/details/utils';
import { VisibleSectionProvider } from 'components/pages/details/VisibleSectionContext';
import { OutdoorSiteChildrenSection } from 'components/pages/site/components/OutdoorSiteChildrenSection';
import { useOutdoorCourse } from 'components/pages/site/useOutdoorCourse';
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
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin } from 'components/Icons/MapPin';
import { cleanHTMLElementsFromString } from '../../../modules/utils/string';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { ImageWithLegend } from '../details/components/DetailsCoverCarousel/DetailsCoverCarousel';
import { DetailsMeteoWidget } from '../details/components/DetailsMeteoWidget';
import { DetailsSensitiveArea } from '../details/components/DetailsSensitiveArea';

interface Props {
  outdoorCourseUrl: string | string[] | undefined;
  language: string;
}

export const OutdoorCourseUIWithoutContext: React.FC<Props> = ({ outdoorCourseUrl, language }) => {
  const {
    id,
    outdoorCourseContent,
    isLoading,
    refetch,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    sectionsReferences,
    sectionsPositions,
    setPreviewRef,
    setPoisRef,
    setTouristicContentsRef,
    setSensitiveAreasRef,
  } = useOutdoorCourse(outdoorCourseUrl, language);

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
          title={outdoorCourseContent?.name}
          description={cleanHTMLElementsFromString(outdoorCourseContent?.description)}
          sharingImageUrl={
            outdoorCourseContent !== undefined && outdoorCourseContent.attachments.length > 0
              ? outdoorCourseContent.attachments[0].url
              : undefined
          }
        />
        {outdoorCourseContent === undefined ? (
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
              <div id="details_container">
                <DetailsHeader
                  sectionsReferences={sectionsReferences}
                  details={outdoorCourseContent}
                  type={'OUTDOOR_COURSE'}
                />
                {outdoorCourseContent.name !== undefined && (
                  <DetailsHeaderMobile title={outdoorCourseContent.name} />
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
                          {outdoorCourseContent.attachments.length > 1 &&
                          typeof navigator !== 'undefined' &&
                          navigator?.onLine ? (
                            <DetailsCoverCarousel
                              attachments={outdoorCourseContent.attachments}
                              onClickImage={toggleFullscreen}
                            />
                          ) : (
                            <ImageWithLegend
                              attachment={outdoorCourseContent.attachments[0]}
                              onClick={toggleFullscreen}
                            />
                          )}
                        </div>
                      )}
                    </Modal>
                    <div
                      id="outdoorCourseContent_text"
                      className="desktop:py-0
                relative -top-6 desktop:-top-9
                flex flex-col"
                      ref={sectionsContainerRef}
                    >
                      <DetailsTopIcons
                        details={outdoorCourseContent}
                        practice={{
                          id: 0,
                          pictogram: '',
                          name: '',
                        }}
                        type={'OUTDOOR_COURSE'}
                      />

                      <div ref={setPreviewRef} id="details_preview_ref">
                        <DetailsPreview
                          className={marginDetailsChild}
                          informations={{
                            duration: outdoorCourseContent.duration,
                            distance: outdoorCourseContent.length,
                            maxElevation: outdoorCourseContent.maxElevation,
                            difficulty: null,
                            courseType: null,
                            elevation: null,
                            networks: [],
                          }}
                          place={outdoorCourseContent.place}
                          tags={[]}
                          title={outdoorCourseContent.name}
                          teaser={''}
                          ambiance={''}
                          details={outdoorCourseContent}
                          type={'OUTDOOR_COURSE'}
                          id={id}
                        />
                      </div>

                      {Number(outdoorCourseContent?.children?.length) > 0 && (
                        <div id="details_trekChildren_ref">
                          <OutdoorSiteChildrenSection
                            outdoorChildren={outdoorCourseContent?.children?.map(child => ({
                              ...child,
                              id: `${child.id}`,
                            }))}
                            id={id}
                            title={intl.formatMessage({ id: 'outdoorSite.childrenFullTitle' })}
                          />
                        </div>
                      )}

                      {outdoorCourseContent.description && (
                        <div id="details_description_ref">
                          <DetailsDescription
                            descriptionHtml={outdoorCourseContent.description}
                            className={marginDetailsChild}
                            cities={outdoorCourseContent.cities}
                          />
                        </div>
                      )}

                      {outdoorCourseContent.gear && (
                        <div id="details_gear_ref">
                          <DetailsDescription
                            descriptionHtml={outdoorCourseContent.gear}
                            className={marginDetailsChild}
                            title={<FormattedMessage id="details.gear" />}
                          />
                        </div>
                      )}

                      {outdoorCourseContent.equipment && (
                        <div id="details_equipment_ref">
                          <DetailsDescription
                            descriptionHtml={outdoorCourseContent.equipment}
                            className={marginDetailsChild}
                            title={<FormattedMessage id="details.equipment" />}
                          />
                        </div>
                      )}

                      {Number(outdoorCourseContent?.pois?.length) > 0 && (
                        <div ref={setPoisRef} id="details_poi_ref">
                          <DetailsCardSection
                            htmlId="details_poi"
                            title={intl.formatMessage(
                              { id: 'details.poiFullTitle' },
                              { count: Number(outdoorCourseContent?.pois?.length) },
                            )}
                            detailsCards={outdoorCourseContent?.pois?.map(poi => ({
                              id: `${poi.id}`,
                              name: poi.name ?? '',
                              description: poi.description,
                              thumbnailUris: poi.thumbnailUris,
                              attachments: poi.attachments,
                              iconUri: poi.type.pictogramUri,
                              iconName: poi.type.label,
                            }))}
                            type="POI"
                          />
                        </div>
                      )}

                      {outdoorCourseContent.sensitiveAreas.length > 0 && (
                        <div ref={setSensitiveAreasRef} id="details_sensitiveAreas_ref">
                          <DetailsSection
                            htmlId="details_sensitiveAreas"
                            titleId="details.sensitiveAreas.title"
                            className={marginDetailsChild}
                          >
                            <span className="mb-4 desktop:mb-8">
                              <FormattedMessage id="details.sensitiveAreas.intro" />
                            </span>
                            {outdoorCourseContent.sensitiveAreas.map((sensitiveArea, i) => (
                              <DetailsSensitiveArea
                                key={i}
                                {...sensitiveArea}
                                className="my-4 desktop:my-8 ml-3 desktop:ml-6"
                              />
                            ))}
                          </DetailsSection>
                        </div>
                      )}

                      {outdoorCourseContent.advice && (
                        <DetailsSection
                          htmlId="details_recommandations"
                          titleId="details.recommandations"
                          className={marginDetailsChild}
                        >
                          {outdoorCourseContent.advice && (
                            <DetailsAdvice
                              text={outdoorCourseContent.advice}
                              className="mb-4 desktop:mb-6"
                            />
                          )}

                          {outdoorCourseContent.accessibility && (
                            <div style={{ marginTop: 20 }}>
                              <strong className="font-bold">
                                <FormattedMessage id="details.accessibility" /> :{' '}
                              </strong>
                              <HtmlText>{parse(outdoorCourseContent.accessibility)}</HtmlText>
                            </div>
                          )}
                        </DetailsSection>
                      )}

                      {outdoorCourseContent.touristicContents.length > 0 && (
                        <div ref={setTouristicContentsRef} id="details_touristicContent_ref">
                          <DetailsCardSection
                            htmlId="details_touristicContent"
                            title={intl.formatMessage({ id: 'details.touristicContent' })}
                            displayBadge
                            generateUrlFunction={generateTouristicContentUrl}
                            detailsCards={outdoorCourseContent.touristicContents.map(
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
                      {getGlobalConfig().enableMeteoWidget &&
                        typeof navigator !== 'undefined' &&
                        navigator.onLine &&
                        outdoorCourseContent.cities_raw &&
                        outdoorCourseContent.cities_raw[0] && (
                          <DetailsSection>
                            <DetailsMeteoWidget code={outdoorCourseContent.cities_raw[0]} />
                          </DetailsSection>
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
                        experiences={outdoorCourseContent?.children}
                        type="DESKTOP"
                        outdoorGeometry={{
                          geometry: outdoorCourseContent.geometry,
                          pictogramUri: '',
                          name: outdoorCourseContent.name,
                          id: outdoorCourseContent.id,
                        }}
                        poiPoints={outdoorCourseContent.pois.map(poi => ({
                          location: { x: poi.geometry.x, y: poi.geometry.y },
                          pictogramUri: poi.type.pictogramUri,
                          name: poi.name,
                          id: `DETAILS-POI-${poi.id}`,
                        }))}
                        bbox={outdoorCourseContent.bbox}
                        trekChildrenGeometry={[]}
                        touristicContentPoints={outdoorCourseContent.touristicContents
                          .filter(touristicContent => touristicContent.geometry !== null)
                          .map(touristicContent => ({
                            // It's ok to ignore this rule, we filtered null values 2 lines above
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            geometry: touristicContent.geometry!,
                            pictogramUri: touristicContent.category.pictogramUri,
                            name: touristicContent.name,
                            id: `DETAILS-TOURISTIC_CONTENT-${touristicContent.id}`,
                          }))}
                        sensitiveAreas={outdoorCourseContent.sensitiveAreas
                          .filter(sensitiveArea => sensitiveArea.geometry !== null)
                          .map(({ geometry, color }) => ({
                            geometry,
                            color,
                          }))}
                        trekId={Number(id)}
                        title={outdoorCourseContent.name}
                        signage={outdoorCourseContent.signage}
                        service={outdoorCourseContent.service?.map(service => ({
                          location: { x: service.geometry.x, y: service.geometry.y },
                          pictogramUri:
                            service.type.pictogram ??
                            renderToStaticMarkup(<MapPin color="white" />),
                          name: service.type.name,
                          id: `DETAILS-SERVICE-${service.id}`,
                        }))}
                        infrastructure={outdoorCourseContent.infrastructure}
                      />
                    </div>
                  )}
                </div>
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
                  experiences={outdoorCourseContent?.children}
                  type="MOBILE"
                  outdoorGeometry={{
                    geometry: outdoorCourseContent.geometry,
                    pictogramUri: '',
                    name: outdoorCourseContent.name,
                    id: outdoorCourseContent.id,
                  }}
                  poiPoints={outdoorCourseContent.pois.map(poi => ({
                    location: { x: poi.geometry.x, y: poi.geometry.y },
                    pictogramUri: poi.type.pictogramUri,
                    name: poi.name,
                    id: `${poi.id}`,
                  }))}
                  bbox={outdoorCourseContent.bbox}
                  trekChildrenGeometry={[]}
                  touristicContentPoints={outdoorCourseContent.touristicContents
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
                  title={outdoorCourseContent.name}
                  signage={outdoorCourseContent.signage}
                  service={outdoorCourseContent.service?.map(service => ({
                    location: { x: service.geometry.x, y: service.geometry.y },
                    pictogramUri:
                      service.type.pictogram ?? renderToStaticMarkup(<MapPin color="white" />),
                    name: service.type.name,
                    id: `DETAILS-SERVICE-${service.id}`,
                  }))}
                  infrastructure={outdoorCourseContent.infrastructure}
                />
              </MobileMapContainer>
            )}
          </>
        )}
      </>
    ),
    [outdoorCourseContent, isLoading, mobileMapState],
  );
};

export const OutdoorCourseUI: React.FC<Props> = props => {
  return (
    <VisibleSectionProvider>
      <OutdoorCourseUIWithoutContext
        outdoorCourseUrl={props.outdoorCourseUrl}
        language={props.language}
      />
    </VisibleSectionProvider>
  );
};

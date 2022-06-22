import parse from 'html-react-parser';
import MoreLink from 'components/Information/MoreLink';
import { Layout } from 'components/Layout/Layout';
import { Modal } from 'components/Modal';
import { DetailsAdvice } from 'components/pages/details/components/DetailsAdvice';
import { DetailsCardSection } from 'components/pages/details/components/DetailsCardSection';
import { DetailsDescription } from 'components/pages/details/components/DetailsDescription';
import { DetailsHeader } from 'components/pages/details/components/DetailsHeader';
import { DetailsInformationDesk } from 'components/pages/details/components/DetailsInformationDesk';
import { DetailsLabel } from 'components/pages/details/components/DetailsLabel';
import { DetailsSection } from 'components/pages/details/components/DetailsSection';
import { DetailsSource } from 'components/pages/details/components/DetailsSource';
import { DetailsHeaderMobile, marginDetailsChild } from 'components/pages/details/Details';
import { useOnScreenSection } from 'components/pages/details/hooks/useHighlightedSection';
import { generateTouristicContentUrl, HtmlText } from 'components/pages/details/utils';
import { VisibleSectionProvider } from 'components/pages/details/VisibleSectionContext';
import { AccessChildrenSection } from 'components/pages/site/components/AccessChildrenSection';
import { OutdoorCoursesChildrenSection } from 'components/pages/site/components/OutdoorCoursesChildrenSection';
import { OutdoorSiteChildrenSection } from 'components/pages/site/components/OutdoorSiteChildrenSection';
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
import { useOutdoorSite } from './useOutdoorSite';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { ImageWithLegend } from '../details/components/DetailsCoverCarousel/DetailsCoverCarousel';
import { DetailsMeteoWidget } from '../details/components/DetailsMeteoWidget';
import { DetailsSensitiveArea } from '../details/components/DetailsSensitiveArea';
import { DetailsAndMapProvider } from '../details/DetailsAndMapContext';

interface Props {
  outdoorSiteUrl: string | string[] | undefined;
  language: string;
}

const OutdoorSiteUIWithoutContext: React.FC<Props> = ({ outdoorSiteUrl, language }) => {
  const {
    id,
    outdoorSiteContent,
    isLoading,
    refetch,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    sectionsReferences,
    sectionsPositions,
    setPreviewRef,
    setAccessRef,
    setPoisRef,
    setExperienceRef,
    setCoursesRef,
    setDescriptionRef,
    setPracticalInformationsRef,
    setTouristicContentsRef,
    setSensitiveAreasRef,
  } = useOutdoorSite(outdoorSiteUrl, language);

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
          title={outdoorSiteContent?.name}
          description={cleanHTMLElementsFromString(outdoorSiteContent?.descriptionTeaser)}
          sharingImageUrl={
            outdoorSiteContent !== undefined && outdoorSiteContent.attachments.length > 0
              ? outdoorSiteContent.attachments[0].url
              : undefined
          }
        />
        {outdoorSiteContent === undefined ? (
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
                  details={outdoorSiteContent}
                  type={'OUTDOOR_SITE'}
                />
                {outdoorSiteContent.name !== undefined && (
                  <DetailsHeaderMobile title={outdoorSiteContent.name} />
                )}
                <div id="outdoorSiteContent_page" className="flex flex-1">
                  <div
                    id="outdoorSiteContent_informations"
                    className="flex flex-col w-full relative -top-detailsHeaderMobile desktop:top-0 desktop:w-3/5"
                  >
                    <OpenMapButton displayMap={displayMobileMap} />
                    <Modal>
                      {({ toggleFullscreen, isFullscreen }) => (
                        <div
                          id="outdoorSiteContent_cover"
                          className={!isFullscreen ? 'desktop:h-coverDetailsDesktop' : 'h-full'}
                        >
                          {outdoorSiteContent.attachments.length > 1 &&
                          typeof navigator !== 'undefined' &&
                          navigator?.onLine ? (
                            <DetailsCoverCarousel
                              attachments={outdoorSiteContent.attachments}
                              onClickImage={toggleFullscreen}
                            />
                          ) : (
                            <ImageWithLegend
                              attachment={outdoorSiteContent.attachments[0]}
                              onClick={toggleFullscreen}
                            />
                          )}
                        </div>
                      )}
                    </Modal>
                    <div
                      id="outdoorSiteContent_text"
                      className="desktop:py-0
                relative -top-6 desktop:-top-9
                flex flex-col"
                      ref={sectionsContainerRef}
                    >
                      <DetailsTopIcons
                        details={outdoorSiteContent}
                        practice={outdoorSiteContent.practice}
                        type={'OUTDOOR_SITE'}
                      />

                      <div ref={setPreviewRef} id="details_preview_ref">
                        <DetailsPreview
                          className={marginDetailsChild}
                          informations={{
                            duration: null,
                            distance: null,
                            elevation: null,
                            difficulty: null,
                            courseType: null,
                            networks: [],
                            period: outdoorSiteContent.period,
                            wind: outdoorSiteContent.wind,
                            orientation: outdoorSiteContent.orientation,
                          }}
                          place={outdoorSiteContent.place}
                          tags={outdoorSiteContent.themes}
                          title={outdoorSiteContent.name}
                          teaser={outdoorSiteContent.descriptionTeaser}
                          ambiance={outdoorSiteContent.ambiance}
                          details={outdoorSiteContent}
                          type={'OUTDOOR_SITE'}
                          id={id}
                        />
                      </div>

                      {Number(outdoorSiteContent?.pois?.length) > 0 && (
                        <div ref={setPoisRef} id="details_poi_ref">
                          <DetailsCardSection
                            htmlId="details_poi"
                            title={intl.formatMessage(
                              { id: 'details.poiFullTitle' },
                              { count: Number(outdoorSiteContent?.pois?.length) },
                            )}
                            detailsCards={outdoorSiteContent?.pois?.map(poi => ({
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

                      {!!outdoorSiteContent.description && (
                        <div ref={setDescriptionRef} id="details_description_ref">
                          <DetailsDescription
                            cities={outdoorSiteContent.cities}
                            descriptionHtml={outdoorSiteContent.description}
                            className={marginDetailsChild}
                          />
                        </div>
                      )}

                      {Number(outdoorSiteContent?.children?.length) > 0 && (
                        <div ref={setExperienceRef} id="details_trekChildren_ref">
                          <OutdoorSiteChildrenSection
                            outdoorChildren={outdoorSiteContent?.children}
                            id={id}
                            title={intl.formatMessage(
                              { id: 'outdoorSite.sitesFullTitle' },
                              { count: Number(outdoorSiteContent?.children?.length) },
                            )}
                          />
                        </div>
                      )}

                      {Number(outdoorSiteContent?.courses?.length) > 0 && (
                        <div ref={setCoursesRef} id="details_trekChildren_ref">
                          <OutdoorCoursesChildrenSection
                            outdoorChildren={outdoorSiteContent?.courses}
                            id={id}
                            title={intl.formatMessage(
                              { id: 'outdoorSite.coursesFullTitle' },
                              { count: Number(outdoorSiteContent?.courses?.length) },
                            )}
                          />
                        </div>
                      )}

                      {outdoorSiteContent.sensitiveAreas.length > 0 && (
                        <div ref={setSensitiveAreasRef} id="details_sensitiveAreas_ref">
                          <DetailsSection
                            htmlId="details_sensitiveAreas"
                            titleId="details.sensitiveAreas.title"
                            className={marginDetailsChild}
                          >
                            <span className="mb-4 desktop:mb-8">
                              <FormattedMessage id="details.sensitiveAreas.intro" />
                            </span>
                            {outdoorSiteContent.sensitiveAreas.map((sensitiveArea, i) => (
                              <DetailsSensitiveArea
                                key={i}
                                {...sensitiveArea}
                                className="my-4 desktop:my-8 ml-3 desktop:ml-6"
                              />
                            ))}
                          </DetailsSection>
                        </div>
                      )}

                      {(!!outdoorSiteContent.advice ||
                        Number(outdoorSiteContent?.labels?.length) > 0) && (
                        <DetailsSection
                          htmlId="details_recommandations"
                          titleId="details.recommandations"
                          className={marginDetailsChild}
                        >
                          {!!outdoorSiteContent.advice && (
                            <DetailsAdvice
                              text={outdoorSiteContent.advice}
                              className="mb-4 desktop:mb-6"
                            />
                          )}
                          {outdoorSiteContent?.labels?.map((label, i) => (
                            <DetailsLabel
                              key={i}
                              id={label.id}
                              name={label.name}
                              advice={label.advice}
                              pictogramUri={label.pictogramUri}
                              className={
                                i < Number(outdoorSiteContent?.labels?.length) - 1
                                  ? 'mb-4 desktop:mb-6'
                                  : ''
                              }
                            />
                          ))}

                          {outdoorSiteContent.accessibility && (
                            <div style={{ marginTop: 20 }}>
                              <strong className="font-bold">
                                <FormattedMessage id="details.accessibility" /> :{' '}
                              </strong>
                              <HtmlText>{parse(outdoorSiteContent.accessibility)}</HtmlText>
                            </div>
                          )}
                        </DetailsSection>
                      )}

                      {Number(outdoorSiteContent?.access?.length) > 0 && (
                        <div ref={setAccessRef} id="details_trekChildren_ref">
                          <AccessChildrenSection
                            accessChildren={outdoorSiteContent?.access}
                            id={id}
                            title={intl.formatMessage(
                              { id: 'outdoorSite.accessFullTitle' },
                              { count: Number(outdoorSiteContent?.access?.length) },
                            )}
                          />
                        </div>
                      )}

                      {Number(outdoorSiteContent?.informationDesks?.length) > 0 && (
                        <div ref={setPracticalInformationsRef} id="details_practicalInformationRef">
                          <DetailsSection
                            htmlId="details_informationDesks"
                            titleId="details.informationDesks"
                            className={marginDetailsChild}
                          >
                            {outdoorSiteContent?.informationDesks?.map((informationDesk, i) => (
                              <DetailsInformationDesk key={i} {...informationDesk} />
                            ))}
                          </DetailsSection>
                        </div>
                      )}

                      {getGlobalConfig().enableMeteoWidget &&
                        typeof navigator !== 'undefined' &&
                        navigator.onLine &&
                        outdoorSiteContent.cities_raw &&
                        outdoorSiteContent.cities_raw[0] && (
                          <DetailsSection>
                            <DetailsMeteoWidget code={outdoorSiteContent.cities_raw[0]} />
                          </DetailsSection>
                        )}

                      {Number(outdoorSiteContent?.source?.length) > 0 && (
                        <DetailsSection
                          htmlId="details_source"
                          titleId="details.source"
                          className={marginDetailsChild}
                        >
                          {outdoorSiteContent?.source?.map((source, i) => (
                            <DetailsSource
                              key={i}
                              name={source.name}
                              website={source.website}
                              pictogramUri={source.pictogramUri}
                            />
                          ))}
                        </DetailsSection>
                      )}

                      {Number(outdoorSiteContent?.webLinks?.length) > 0 && (
                        <div id="details_more_ref">
                          <DetailsSection
                            htmlId="details_more"
                            titleId="details.more"
                            className={marginDetailsChild}
                          >
                            {outdoorSiteContent?.webLinks?.map((link, i) => (
                              <MoreLink key={i} link={link} />
                            ))}
                          </DetailsSection>
                        </div>
                      )}

                      {outdoorSiteContent.touristicContents.length > 0 && (
                        <div ref={setTouristicContentsRef} id="details_touristicContent_ref">
                          <DetailsCardSection
                            htmlId="details_touristicContent"
                            title={intl.formatMessage({ id: 'details.touristicContent' })}
                            displayBadge
                            generateUrlFunction={generateTouristicContentUrl}
                            detailsCards={outdoorSiteContent.touristicContents.map(
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
                      id="outdoorSiteContent_map"
                      className="desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar"
                    >
                      <DetailsMapDynamicComponent
                        courses={outdoorSiteContent?.courses}
                        experiences={outdoorSiteContent?.children}
                        type="DESKTOP"
                        outdoorGeometry={{
                          geometry: outdoorSiteContent.geometry,
                          pictogramUri: '',
                          name: outdoorSiteContent.name,
                          id: outdoorSiteContent.id,
                        }}
                        poiPoints={outdoorSiteContent.pois.map(poi => ({
                          location: { x: poi.geometry.x, y: poi.geometry.y },
                          pictogramUri: poi.type.pictogramUri,
                          name: poi.name,
                          id: `DETAILS-POI-${poi.id}`,
                        }))}
                        bbox={outdoorSiteContent.bbox}
                        trekChildrenGeometry={[]}
                        touristicContentPoints={outdoorSiteContent.touristicContents
                          .filter(touristicContent => touristicContent.geometry !== null)
                          .map(touristicContent => ({
                            // It's ok to ignore this rule, we filtered null values 2 lines above
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            geometry: touristicContent.geometry!,
                            pictogramUri: touristicContent.category.pictogramUri,
                            name: touristicContent.name,
                            id: `DETAILS-TOURISTIC_CONTENT-${touristicContent.id}`,
                          }))}
                        sensitiveAreas={outdoorSiteContent.sensitiveAreas
                          .filter(sensitiveArea => sensitiveArea.geometry !== null)
                          .map(({ geometry, color }) => ({
                            geometry,
                            color,
                          }))}
                        trekId={Number(id)}
                        informationDesks={outdoorSiteContent?.informationDesks}
                        signage={outdoorSiteContent.signage}
                        service={outdoorSiteContent.service?.map(service => ({
                          location: { x: service.geometry.x, y: service.geometry.y },
                          pictogramUri:
                            service.type.pictogram ??
                            renderToStaticMarkup(<MapPin color="white" />),
                          name: service.type.name,
                          id: `DETAILS-SERVICE-${service.id}`,
                        }))}
                        infrastructure={outdoorSiteContent.infrastructure}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Layout>
            {isMobile && (
              <MobileMapContainer
                id="outdoorSiteContent_mobileMap"
                className={`desktop:hidden fixed right-0 left-0 h-full z-map ${
                  mobileMapState === 'HIDDEN' ? 'invisible' : 'flex'
                }`}
                displayState={mobileMapState}
              >
                <DetailsMapDynamicComponent
                  courses={outdoorSiteContent?.courses}
                  experiences={outdoorSiteContent?.children}
                  type="MOBILE"
                  outdoorGeometry={{
                    geometry: outdoorSiteContent.geometry,
                    pictogramUri: '',
                    name: outdoorSiteContent.name,
                    id: outdoorSiteContent.id,
                  }}
                  poiPoints={outdoorSiteContent.pois.map(poi => ({
                    location: { x: poi.geometry.x, y: poi.geometry.y },
                    pictogramUri: poi.type.pictogramUri,
                    name: poi.name,
                    id: `${poi.id}`,
                  }))}
                  bbox={outdoorSiteContent.bbox}
                  trekChildrenGeometry={[]}
                  touristicContentPoints={outdoorSiteContent.touristicContents
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
                  signage={outdoorSiteContent.signage}
                  service={outdoorSiteContent.service?.map(service => ({
                    location: { x: service.geometry.x, y: service.geometry.y },
                    pictogramUri:
                      service.type.pictogram ?? renderToStaticMarkup(<MapPin color="white" />),
                    name: service.type.name,
                    id: `DETAILS-SERVICE-${service.id}`,
                  }))}
                  infrastructure={outdoorSiteContent.infrastructure}
                />
              </MobileMapContainer>
            )}
          </>
        )}
      </>
    ),
    [outdoorSiteContent, isLoading, mobileMapState],
  );
};

export const OutdoorSiteUI: React.FC<Props> = props => {
  return (
    <DetailsAndMapProvider>
      <VisibleSectionProvider>
        <OutdoorSiteUIWithoutContext
          outdoorSiteUrl={props.outdoorSiteUrl}
          language={props.language}
        />
      </VisibleSectionProvider>
    </DetailsAndMapProvider>
  );
};

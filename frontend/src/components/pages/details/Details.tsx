import { Layout } from 'components/Layout/Layout';
import Loader from 'react-loader';
import parse from 'html-react-parser';
import { FormattedMessage } from 'react-intl';
import { PageHead } from 'components/PageHead';
import { DetailsMapDynamicComponent } from 'components/Map';
import { OpenMapButton } from 'components/OpenMapButton';
import { MobileMapContainer } from 'components/pages/search';
import { useShowOnScrollPosition } from 'hooks/useShowOnScrollPosition';
import { colorPalette, sizes, zIndex } from 'stylesheet';
import { RemoteIconInformation } from 'components/Information/RemoteIconInformation';
import { useMemo, useRef } from 'react';
import { TrekChildGeometry } from 'modules/details/interface';
import { Footer } from 'components/Footer';
import { DetailsPreview } from './components/DetailsPreview';
import { DetailsSection } from './components/DetailsSection';
import { DetailsDescription } from './components/DetailsDescription';
import { DetailsHeader } from './components/DetailsHeader';
import { DetailsCardSection } from './components/DetailsCardSection';
import { useDetails } from './useDetails';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from './components/DetailsTopIcons';
import { generateTouristicContentUrl, HtmlText } from './utils';
import { DetailsSource } from './components/DetailsSource';

import { DetailsInformationDesk } from './components/DetailsInformationDesk';
import { DetailsLabel } from './components/DetailsLabel';
import { DetailsAdvice } from './components/DetailsAdvice';
import { DetailsChildrenSection } from './components/DetailsChildrenSection';
import { DetailsCoverCarousel } from './components/DetailsCoverCarousel';
import { ImageWithLegend } from './components/DetailsCoverCarousel/DetailsCoverCarousel';
import { VisibleSectionProvider } from './VisibleSectionContext';
import { DetailsSensitiveArea } from './components/DetailsSensitiveArea';
import { useOnScreenSection } from './hooks/useHighlightedSection';

interface Props {
  detailsId: string | string[] | undefined;
  parentId?: string | string[];
  language: string;
}

export const DetailsUIWithoutContext: React.FC<Props> = ({ detailsId, parentId, language }) => {
  const {
    id,
    details,
    trekFamily,
    refetch,
    isLoading,
    sectionsReferences,
    setDescriptionRef,
    setChildrenRef,
    setPoisRef,
    setPracticalInformationsRef,
    setPreviewRef,
    setTouristicContentsRef,
    setAccessibilityRef,
    setSensitiveAreasRef,
    sectionsPositions,
    intl,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    path,
  } = useDetails(detailsId, parentId, language);

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
  const titleRegex = RegExp(/(^\d+-)(.*)/).exec(path);
  const title = titleRegex ? titleRegex[2].replace(/-/g, ' ') : '';
  return useMemo(
    () => (
      <>
        <PageHead
          title={title}
          description={details ? details.description_teaser : ''}
          sharingImageUrl={
            details !== undefined && details.imgs.length > 1 ? details.imgs[0].url : undefined
          }
        />
        {details === undefined ? (
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
              <DetailsHeader sectionsReferences={sectionsReferences} downloadUrl={details.pdfUri} />
              {details.title !== undefined && <DetailsHeaderMobile title={details.title} />}
              <div className="flex flex-1" id="details_mainContainer">
                <div
                  id="details_informationContainer"
                  className="flex flex-col w-full
                  relative -top-detailsHeaderMobile desktop:top-0
                  desktop:w-3/5"
                >
                  <OpenMapButton displayMap={displayMobileMap} />
                  <div
                    id="details_cover"
                    className="h-coverDetailsMobile desktop:h-coverDetailsDesktop"
                  >
                    {details.imgs.length > 1 ? (
                      <DetailsCoverCarousel attachments={details.imgs} />
                    ) : (
                      <ImageWithLegend attachment={details.imgs[0]} />
                    )}
                  </div>
                  <div
                    id="details_textContainer"
                    className="desktop:py-0
                    relative -top-6 desktop:-top-9
                    flex flex-col"
                    ref={sectionsContainerRef}
                  >
                    <DetailsTopIcons
                      className={marginDetailsChild}
                      pdfUri={details.pdfUri}
                      gpxUri={details.gpxUri}
                      practice={details.practice ?? undefined}
                      kmlUri={details.kmlUri}
                    />

                    <div ref={setPreviewRef} id="details_preview_ref">
                      <DetailsPreview
                        className={marginDetailsChild}
                        informations={details.informations}
                        place={details.place}
                        tags={details.tags}
                        title={details.title}
                        teaser={details.description_teaser}
                        ambiance={details.ambiance}
                        trekFamily={trekFamily ?? undefined}
                        id={id}
                      />
                    </div>

                    {details.children.length > 0 && (
                      <div ref={setChildrenRef} id="details_trekChildren_ref">
                        <DetailsChildrenSection
                          trekChildren={details.children.map(child => ({
                            ...child,
                            id: `${child.id}`,
                          }))}
                          trekId={id}
                          title={intl.formatMessage(
                            { id: 'details.childrenFullTitle' },
                            { count: details.children.length },
                          )}
                        />
                      </div>
                    )}

                    {details.pois.length > 0 && (
                      <div ref={setPoisRef} id="details_poi_ref">
                        <DetailsCardSection
                          htmlId="details_poi"
                          title={intl.formatMessage(
                            { id: 'details.poiFullTitle' },
                            { count: details.pois.length },
                          )}
                          detailsCards={details.pois.map(poi => ({
                            id: `${poi.id}`,
                            name: poi.name ?? '',
                            description: poi.description,
                            thumbnailUris: poi.thumbnailUris,
                            iconUri: poi.type.pictogramUri,
                          }))}
                          type="POI"
                        />
                      </div>
                    )}

                    {details.description && (
                      <div ref={setDescriptionRef} id="details_description_ref">
                        <DetailsDescription
                          descriptionHtml={details.description}
                          className={marginDetailsChild}
                        />
                      </div>
                    )}
                    <DetailsSection
                      htmlId="details_altimetricProfile"
                      titleId="details.altimetricProfile.title"
                      className={marginDetailsChild}
                    >
                      <div className="h-90" id="altimetric-profile"></div>
                    </DetailsSection>

                    {details.sensitiveAreas.length > 0 && (
                      <div ref={setSensitiveAreasRef} id="details_sensitiveAreas_ref">
                        <DetailsSection
                          htmlId="details_sensitiveAreas"
                          titleId="details.sensitiveAreas.title"
                          className={marginDetailsChild}
                        >
                          <span className="mb-4 desktop:mb-8">
                            <FormattedMessage id="details.sensitiveAreas.intro" />
                          </span>
                          {details.sensitiveAreas.map((sensitiveArea, i) => (
                            <DetailsSensitiveArea
                              key={i}
                              {...sensitiveArea}
                              className="my-4 desktop:my-8 ml-3 desktop:ml-6"
                            />
                          ))}
                        </DetailsSection>
                      </div>
                    )}

                    {(details.labels.length > 0 ||
                      (details.advice !== null && details.advice.length > 0)) && (
                      <DetailsSection
                        htmlId="details_recommandations"
                        titleId="details.recommandations"
                        className={marginDetailsChild}
                      >
                        {details.labels.map((label, i) => (
                          <DetailsLabel
                            key={i}
                            id={label.id}
                            name={label.name}
                            advice={label.advice}
                            pictogramUri={label.pictogramUri}
                            className={i < details.labels.length - 1 ? 'mb-4 desktop:mb-6' : ''}
                          />
                        ))}
                        {details.advice !== null && details.advice.length > 0 && (
                          <DetailsAdvice text={details.advice} className="mt-4 desktop:mt-6" />
                        )}
                      </DetailsSection>
                    )}

                    {(details.informationDesks.length > 0 ||
                      details.transport ||
                      details.access) && (
                      <div ref={setPracticalInformationsRef} id="details_practicalInformationRef">
                        {details.informationDesks.length > 0 && (
                          <DetailsSection
                            htmlId="details_informationDesks"
                            titleId="details.informationDesks"
                            className={marginDetailsChild}
                          >
                            {details.informationDesks.map((informationDesk, i) => (
                              <DetailsInformationDesk
                                key={i}
                                className={
                                  i < details.informationDesks.length - 1
                                    ? 'mb-8 desktop:mb-12'
                                    : undefined
                                }
                                name={informationDesk.name}
                                street={informationDesk.street}
                                postalCode={informationDesk.postalCode}
                                municipality={informationDesk.municipality}
                                website={informationDesk.website}
                                email={informationDesk.email}
                                phone={informationDesk.phone}
                                description={informationDesk.description}
                                photoUrl={informationDesk.photoUrl}
                                type={informationDesk.type}
                              />
                            ))}
                          </DetailsSection>
                        )}

                        {details.transport && (
                          <DetailsSection
                            htmlId="details_transport"
                            titleId="details.transport"
                            className={marginDetailsChild}
                          >
                            <HtmlText>{parse(details.transport)}</HtmlText>
                          </DetailsSection>
                        )}

                        {(details.access || details.parking) && (
                          <DetailsSection
                            htmlId="details_accessParking"
                            titleId="details.access_parking"
                            className={marginDetailsChild}
                          >
                            {details.access && (
                              <HtmlText id="details_access">{parse(details.access)}</HtmlText>
                            )}
                            {details.parking && (
                              <div className="mt-4" id="details_parking">
                                <p className="font-bold desktop:text-H4">
                                  {`${intl.formatMessage({ id: 'details.stationnement' })} :`}
                                </p>
                                <HtmlText>{parse(details.parking)}</HtmlText>
                              </div>
                            )}
                          </DetailsSection>
                        )}
                      </div>
                    )}

                    {(details.disabledInfrastructure || details.accessibilities.length > 0) && (
                      <div ref={setAccessibilityRef} id="details_accessibility_ref">
                        <DetailsSection
                          htmlId="details_accessibility"
                          titleId="details.accessibility"
                          className={marginDetailsChild}
                        >
                          <HtmlText>{parse(details.disabledInfrastructure)}</HtmlText>
                          <div className="flex">
                            {details.accessibilities.map((accessibility, i) => (
                              <RemoteIconInformation
                                key={i}
                                iconUri={accessibility.pictogramUri}
                                className="mr-6 mt-3 desktop:mt-4 text-primary"
                              >
                                {accessibility.name}
                              </RemoteIconInformation>
                            ))}
                          </div>
                        </DetailsSection>
                      </div>
                    )}

                    {details.sources.length > 0 && (
                      <DetailsSection
                        htmlId="details_source"
                        titleId="details.source"
                        className={marginDetailsChild}
                      >
                        {details.sources.map((source, i) => (
                          <DetailsSource
                            key={i}
                            name={source.name}
                            website={source.website}
                            pictogramUri={source.pictogramUri}
                          />
                        ))}
                      </DetailsSection>
                    )}

                    {details.touristicContents.length > 0 && (
                      <div ref={setTouristicContentsRef} id="details_touristicContent_ref">
                        <DetailsCardSection
                          htmlId="details_touristicContent"
                          title={intl.formatMessage({ id: 'details.touristicContent' })}
                          displayBadge
                          generateUrlFunction={generateTouristicContentUrl}
                          detailsCards={details.touristicContents.map(touristicContent => ({
                            id: `${touristicContent.id}`,
                            name: touristicContent.name ?? '',
                            place: touristicContent.category.label,
                            description: touristicContent.descriptionTeaser,
                            thumbnailUris: touristicContent.thumbnailUris,
                            iconUri: touristicContent.category.pictogramUri,
                            logoUri: touristicContent.logoUri ?? undefined,
                          }))}
                          type="TOURISTIC_CONTENT"
                        />
                      </div>
                    )}
                  </div>
                  <Footer />
                </div>

                <div
                  id="details_mapContainer"
                  className="hidden desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar"
                >
                  <DetailsMapDynamicComponent
                    type="DESKTOP"
                    arrivalLocation={details.trekArrival}
                    departureLocation={details.trekDeparture}
                    parkingLocation={
                      details.parkingLocation === null ? undefined : details.parkingLocation
                    }
                    trekGeometry={details.trekGeometry}
                    trekGeoJSON={details.trekGeoJSON}
                    poiPoints={details.pois.map(poi => ({
                      location: { x: poi.geometry.x, y: poi.geometry.y },
                      pictogramUri: poi.type.pictogramUri,
                      name: poi.name,
                      id: `DETAILS-POI-${poi.id}`,
                    }))}
                    pointsReference={details.pointsReference}
                    bbox={details.bbox}
                    trekChildrenGeometry={details.children.reduce<TrekChildGeometry[]>(
                      (children, currentChild) => {
                        if (currentChild.geometry) {
                          children.push({
                            ...currentChild.geometry,
                            id: `DETAILS-TREK_CHILDREN-${currentChild.geometry.id}`,
                          });
                        }
                        return children;
                      },
                      [],
                    )}
                    touristicContentPoints={details.touristicContents
                      .filter(touristicContent => touristicContent.geometry !== null)
                      .map(touristicContent => ({
                        // It's ok to ignore this rule, we filtered null values 2 lines above
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        geometry: touristicContent.geometry!,
                        pictogramUri: touristicContent.category.pictogramUri,
                        name: touristicContent.name,
                        id: `DETAILS-TOURISTIC_CONTENT-${touristicContent.id}`,
                      }))}
                    sensitiveAreas={details.sensitiveAreas
                      .filter(sensitiveArea => sensitiveArea.geometry !== null)
                      .map(({ geometry, color }) => ({
                        geometry,
                        color,
                      }))}
                  />
                </div>
              </div>
            </Layout>
            <MobileMapContainer
              className={`desktop:hidden fixed right-0 left-0 h-full z-map ${
                mobileMapState === 'HIDDEN' ? 'hidden' : 'flex'
              }`}
              displayState={mobileMapState}
            >
              <DetailsMapDynamicComponent
                type="MOBILE"
                arrivalLocation={details.trekArrival}
                departureLocation={details.trekDeparture}
                parkingLocation={
                  details.parkingLocation === null ? undefined : details.parkingLocation
                }
                trekGeometry={details.trekGeometry}
                trekGeoJSON={details.trekGeoJSON}
                poiPoints={details.pois.map(poi => ({
                  location: { x: poi.geometry.x, y: poi.geometry.y },
                  pictogramUri: poi.type.pictogramUri,
                  name: poi.name,
                  id: `${poi.id}`,
                }))}
                pointsReference={details.pointsReference}
                bbox={details.bbox}
                trekChildrenGeometry={details.children.reduce<TrekChildGeometry[]>(
                  (children, currentChild) => {
                    if (currentChild.geometry) {
                      children.push(currentChild.geometry);
                    }
                    return children;
                  },
                  [],
                )}
                touristicContentPoints={details.touristicContents
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
              />
            </MobileMapContainer>
          </>
        )}
      </>
    ),
    [details, isLoading, mobileMapState, sectionsPositions],
  );
};

export const marginDetailsChild = 'mx-4 desktop:mx-18' as const;

interface DetailsHeaderMobileProps {
  title: string;
}

const DetailsHeaderMobile: React.FC<DetailsHeaderMobileProps> = ({ title: name }) => {
  const displayState = useShowOnScrollPosition(sizes.mobileDetailsTitle);
  return (
    <div
      id="details_headerMobile"
      className={`py-3 px-4
      text-P2 font-bold text-primary1
      shadow-md bg-white
      ${displayState === 'DISPLAYED' ? 'top-mobileHeader sticky' : '-top-mobileHeader'}
      desktop:hidden z-headerDetails truncate
      transition-all duration-500
      `}
    >
      {name}
    </div>
  );
};

export const DetailsUI: React.FC<Props> = ({ detailsId, parentId, language }) => {
  return (
    <VisibleSectionProvider>
      <DetailsUIWithoutContext detailsId={detailsId} parentId={parentId} language={language} />
    </VisibleSectionProvider>
  );
};

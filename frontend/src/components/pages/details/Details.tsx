import { Layout } from 'components/Layout/Layout';
import Loader from 'react-loader';
import parse from 'html-react-parser';
import { DetailsMapDynamicComponent } from 'components/Map';
import { OpenMapButton } from 'components/OpenMapButton';
import { MobileMapContainer } from 'components/pages/search';
import { useShowOnScrollPosition } from 'hooks/useShowOnScrollPosition';
import { colorPalette, sizes, zIndex } from 'stylesheet';
import { RemoteIconInformation } from 'components/Information/RemoteIconInformation';
import { useMemo, useRef } from 'react';
import { TrekChildGeometry } from 'modules/details/interface';
import { Footer } from 'components/Footer';
import { isRessourceMissing } from 'services/routeUtils';
import { routes } from 'services/routes';
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
import { useOnScreenSection } from './hooks/useHighlightedSection';

import { DetailsInformationDesk } from './components/DetailsInformationDesk';
import { DetailsLabel } from './components/DetailsLabel';
import { DetailsAdvice } from './components/DetailsAdvice';
import { DetailsChildrenSection } from './components/DetailsChildrenSection';
import { DetailsCoverCarousel } from './components/DetailsCoverCarousel';
import { ImageWithLegend } from './components/DetailsCoverCarousel/DetailsCoverCarousel';
import { VisibleSectionProvider } from './VisibleSectionContext';

interface Props {
  detailsId: string | string[] | undefined;
  parentId?: string | string[];
  language: string;
}

export const DetailsUIWithoutContext: React.FC<Props> = ({ detailsId, parentId, language }) => {
  const {
    id,
    parentIdString,
    details,
    trekFamily,
    refetch,
    isLoading,
    error,
    sectionsReferences,
    setDescriptionRef,
    setChildrenRef,
    setPoisRef,
    setPracticalInformationsRef,
    setPreviewRef,
    setTouristicContentsRef,
    setAccessibilityRef,
    sectionsPositions,
    intl,
    router,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
  } = useDetails(detailsId, parentId, language);

  /** Ref of the parent of all sections */
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  const { visibleSection } = useOnScreenSection({
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
          ) : isRessourceMissing(error) ? (
            router.push(routes.HOME)
          ) : (
            <ErrorFallback refetch={refetch} />
          )
        ) : (
          <>
            <Layout>
              <DetailsHeader sectionsReferences={sectionsReferences} downloadUrl={details.pdfUri} />
              {details.title !== undefined && <DetailsHeaderMobile title={details.title} />}
              <div className="flex flex-1">
                <div
                  className="flex flex-col w-full
              relative -top-detailsHeaderMobile desktop:top-0
              desktop:w-3/5"
                >
                  <OpenMapButton displayMap={displayMobileMap} />
                  <div className="h-coverDetailsMobile desktop:h-coverDetailsDesktop">
                    {details.imgs.length > 1 ? (
                      <DetailsCoverCarousel attachments={details.imgs} />
                    ) : (
                      <ImageWithLegend attachment={details.imgs[0]} />
                    )}
                  </div>
                  <div
                    className="desktop:py-0
                relative -top-6 desktop:-top-9
                flex flex-col"
                    ref={sectionsContainerRef}
                  >
                    <DetailsTopIcons
                      className={marginDetailsChild}
                      pdfUri={details.pdfUri}
                      gpxUri={details.gpxUri}
                      practice={details.practice}
                      kmlUri={details.kmlUri}
                    />

                    <div ref={setPreviewRef}>
                      <DetailsPreview
                        className={marginDetailsChild}
                        informations={details.informations}
                        place={details.place}
                        tags={details.tags}
                        title={details.title}
                        teaser={details.description_teaser}
                        ambiance={details.ambiance}
                        trekFamily={trekFamily}
                        id={id}
                        parentId={parentIdString}
                      />
                    </div>

                    {details.children.length > 0 && (
                      <div ref={setChildrenRef}>
                        <DetailsChildrenSection
                          trekChildren={details.children}
                          trekId={id}
                          title={intl.formatMessage(
                            { id: 'details.childrenFullTitle' },
                            { count: details.children.length },
                          )}
                        />
                      </div>
                    )}

                    {details.pois.length > 0 && (
                      <div ref={setPoisRef}>
                        <DetailsCardSection
                          title={intl.formatMessage(
                            { id: 'details.poiFullTitle' },
                            { count: details.pois.length },
                          )}
                          detailsCards={details.pois.map(poi => ({
                            name: poi.name ?? '',
                            description: poi.description,
                            thumbnailUris: poi.thumbnailUris,
                            iconUri: poi.type.pictogramUri,
                          }))}
                        />
                      </div>
                    )}

                    {details.description && (
                      <div ref={setDescriptionRef}>
                        <DetailsDescription
                          descriptionHtml={details.description}
                          className={marginDetailsChild}
                        />
                      </div>
                    )}
                    <DetailsSection
                      titleId="details.altimetricProfile.title"
                      className={marginDetailsChild}
                    >
                      <div id="altimetric-profile"></div>
                    </DetailsSection>

                    {(details.labels.length > 0 ||
                      (details.advice !== null && details.advice.length > 0)) && (
                      <DetailsSection
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
                      <div ref={setPracticalInformationsRef}>
                        {details.informationDesks.length > 0 && (
                          <DetailsSection
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
                            titleId="details.transport"
                            className={marginDetailsChild}
                          >
                            <HtmlText>{parse(details.transport)}</HtmlText>
                          </DetailsSection>
                        )}

                        {(details.access || details.parking) && (
                          <DetailsSection
                            titleId="details.access_parking"
                            className={marginDetailsChild}
                          >
                            {details.access && <HtmlText>{parse(details.access)}</HtmlText>}
                            {details.parking && (
                              <div className="mt-4">
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
                      <div ref={setAccessibilityRef}>
                        <DetailsSection
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
                      <DetailsSection titleId="details.source" className={marginDetailsChild}>
                        <div>
                          {details.sources.map((source, i) => (
                            <DetailsSource
                              key={i}
                              name={source.name}
                              website={source.website}
                              pictogramUri={source.pictogramUri}
                            />
                          ))}
                        </div>
                      </DetailsSection>
                    )}

                    {details.touristicContents.length > 0 && (
                      <div ref={setTouristicContentsRef}>
                        <DetailsCardSection
                          title={intl.formatMessage({ id: 'details.touristicContent' })}
                          displayBadge
                          generateUrlFunction={generateTouristicContentUrl}
                          detailsCards={details.touristicContents.map(touristicContent => ({
                            id: touristicContent.id,
                            name: touristicContent.name ?? '',
                            place: touristicContent.category.label,
                            description: touristicContent.descriptionTeaser,
                            thumbnailUris: touristicContent.thumbnailUris,
                            iconUri: touristicContent.category.pictogramUri,
                            logoUri: touristicContent.logoUri,
                          }))}
                        />
                      </div>
                    )}
                  </div>
                  <Footer />
                </div>

                <div className="hidden desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar">
                  <DetailsMapDynamicComponent
                    type="DESKTOP"
                    arrivalLocation={details.trekArrival}
                    departureLocation={details.trekDeparture}
                    parkingLocation={details.parkingLocation}
                    trekGeometry={details.trekGeometry}
                    trekGeoJSON={details.trekGeoJSON}
                    poiPoints={details.pois.map(poi => ({
                      location: { x: poi.geometry.x, y: poi.geometry.y },
                      pictogramUri: poi.type.pictogramUri,
                      name: poi.name,
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
                parkingLocation={details.parkingLocation}
                trekGeometry={details.trekGeometry}
                trekGeoJSON={details.trekGeoJSON}
                poiPoints={details.pois.map(poi => ({
                  location: { x: poi.geometry.x, y: poi.geometry.y },
                  pictogramUri: poi.type.pictogramUri,
                  name: poi.name,
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

export const DetailsUI: React.FC<Props> = ({ detailsId, parentId }) => {
  return (
    <VisibleSectionProvider>
      <DetailsUIWithoutContext detailsId={detailsId} parentId={parentId} />
    </VisibleSectionProvider>
  );
};

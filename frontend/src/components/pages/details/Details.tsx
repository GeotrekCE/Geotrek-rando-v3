import MoreLink from 'components/Information/MoreLink';
import { Modal } from 'components/Modal';
import Loader from 'components/Loader';

import parse from 'html-react-parser';
import { FormattedMessage } from 'react-intl';
import { PageHead } from 'components/PageHead';
import { DetailsMapDynamicComponent } from 'components/Map';
import { OpenMapButton } from 'components/OpenMapButton';
import { useShowOnScrollPosition } from 'hooks/useShowOnScrollPosition';
import { useMediaPredicate } from 'react-media-hook';
import { sizes } from 'stylesheet';
import { useCallback, useMemo, useRef } from 'react';
import { TrekChildGeometry } from 'modules/details/interface';
import { cleanHTMLElementsFromString } from 'modules/utils/string';
import Report from 'components/Report/Report';
import { getGlobalConfig } from 'modules/utils/api.config';
import { Footer } from 'components/Footer';
import Accessibility, { shouldDisplayAccessibility } from 'components/Accessibility';

import useHasMounted from 'hooks/useHasMounted';
import { cn } from 'services/utils/cn';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin } from 'components/Icons/MapPin';
import { ImageWithLegend } from 'components/ImageWithLegend';
import { HtmlParser } from 'components/HtmlParser';
import { DetailsPreview } from './components/DetailsPreview';
import { DetailsSection } from './components/DetailsSection';
import { DetailsDescription } from './components/DetailsDescription';
import { DetailsHeader } from './components/DetailsHeader';
import { DetailsCardSection } from './components/DetailsCardSection';
import { useDetails } from './useDetails';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from './components/DetailsTopIcons';
import {
  generateTouristicContentUrl,
  HtmlText,
  templatesVariablesAreDefinedAndUsed,
} from './utils';
import { DetailsSource } from './components/DetailsSource';

import { DetailsInformationDesk } from './components/DetailsInformationDesk';
import { DetailsLabel } from './components/DetailsLabel';
import { DetailsAdvice } from './components/DetailsAdvice';
import { DetailsChildrenSection } from './components/DetailsChildrenSection';
import { DetailsCoverCarousel } from './components/DetailsCoverCarousel';
import { DetailsReservationWidget } from './components/DetailsReservationWidget';
import { VisibleSectionProvider } from './VisibleSectionContext';
import { DetailsAndMapProvider } from './DetailsAndMapContext';
import { DetailsSensitiveArea } from './components/DetailsSensitiveArea';
import { useOnScreenSection } from './hooks/useHighlightedSection';
import { DetailsGear } from './components/DetailsGear';
import { useDetailsSections } from './useDetailsSections';
import { DetailsMedias } from './components/DetailsMedias';

interface Props {
  slug: string | string[] | undefined;
  parentId?: string | string[];
  language: string;
}

export const DetailsUIWithoutContext: React.FC<Props> = ({ slug, parentId, language }) => {
  const {
    id,
    details,
    trekFamily,
    refetch,
    isLoading,
    sectionsReferences,
    sectionsPositions,
    intl,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    sectionRef,
    mapId,
    setMapId,
  } = useDetails(slug, parentId, language);

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  /** Ref of the parent of all sections */
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const hasNavigator = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);

  const { sections, anchors } = useDetailsSections('trek');

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

  const positiveElevation = parseInt(details?.informations.elevation ?? '0', 10);
  const negativeElevation = parseInt(details?.informations.negativeElevation ?? '0', 10);

  const higherDifferenceElevation = Math.max(positiveElevation, Math.abs(negativeElevation));

  const displayAltimetricProfile =
    Boolean(higherDifferenceElevation) &&
    (getGlobalConfig().minAltitudeDifferenceToDisplayElevationProfile ?? 0) <
      higherDifferenceElevation;

  const handleViewPointClick = useCallback(
    (viewPointId: string) => {
      setMapId(viewPointId);
      displayMobileMap();
    },
    [displayMobileMap, setMapId],
  );

  return useMemo(
    () => (
      <>
        <PageHead
          title={details?.title}
          description={cleanHTMLElementsFromString(details?.description_teaser)}
          sharingImageUrl={details?.imgs?.[0]?.url}
        />
        {details === undefined ? (
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
              details={details}
              type={'TREK'}
            />
            {details.title !== undefined && <DetailsHeaderMobile title={details.title} />}
            <div className="flex flex-1" id="details_mainContainer">
              <div
                id="details_informationContainer"
                className="flex flex-col w-full relative -top-detailsHeaderMobile desktop:top-0 desktop:w-3/5"
              >
                <OpenMapButton displayMap={displayMobileMap} setMapId={setMapId} />
                <div className="desktop:h-coverDetailsDesktop">
                  <Modal>
                    {({ isFullscreen, toggleFullscreen }) => (
                      <div
                        id="details_cover"
                        className={!isFullscreen ? 'desktop:h-coverDetailsDesktop' : 'h-full'}
                      >
                        {details.imgs.length > 1 && hasNavigator ? (
                          <DetailsCoverCarousel
                            attachments={details.imgs}
                            classNameImage={isFullscreen ? 'object-contain' : ''}
                            onClickImage={toggleFullscreen}
                          />
                        ) : (
                          <ImageWithLegend
                            attachment={details.imgs[0]}
                            classNameImage={isFullscreen ? 'object-contain' : ''}
                            onClick={toggleFullscreen}
                          />
                        )}
                      </div>
                    )}
                  </Modal>
                </div>
                <div
                  id="details_textContainer"
                  className="desktop:py-0
                    relative -top-6 desktop:-top-9
                    flex flex-col"
                  ref={sectionsContainerRef}
                >
                  <DetailsTopIcons
                    details={details}
                    practice={details.practice ?? undefined}
                    displayReservationWidget={anchors.includes('reservationWidget')}
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
                            informations={details.informations}
                            place={details.place}
                            tags={details.tags}
                            title={details.title}
                            teaser={details.description_teaser}
                            ambiance={details.ambiance}
                            details={details}
                            trekFamily={trekFamily ?? undefined}
                            type={'TREK'}
                            id={id}
                          />
                        </section>
                      );
                    }
                    if (
                      hasNavigator &&
                      section.name === 'medias' &&
                      details.viewPoints.length > 0
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection htmlId="details_medias" className={marginDetailsChild}>
                            <DetailsMedias
                              viewPoints={details.viewPoints}
                              handleViewPointClick={handleViewPointClick}
                            />
                          </DetailsSection>
                        </section>
                      );
                    }
                    if (section.name === 'itinerancySteps' && details.children.length > 0) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsChildrenSection
                            id="itinerancySteps"
                            items={details.children.map(child => ({
                              ...child,
                              id: `${child.id}`,
                            }))}
                            parentId={id}
                            title={intl.formatMessage(
                              { id: 'details.itinerancyStepsFullTitle' },
                              { count: details.children.length },
                            )}
                            type="TREK"
                          />
                        </section>
                      );
                    }

                    if (section.name === 'poi' && details.pois.length > 0) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
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
                              thumbnails: poi.thumbnails,
                              attachments: poi.attachments,
                              iconUri: poi.type.pictogramUri,
                              iconName: poi.type.label,
                              viewPoints: poi.viewPoints,
                            }))}
                            type="POI"
                            handleViewPointClick={handleViewPointClick}
                          />
                        </section>
                      );
                    }

                    if (section.name === 'description' && details.description) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsDescription
                            descriptionHtml={details.description}
                            departure={details.departure}
                            arrival={details.arrival}
                            cities={details.cities}
                            className={marginDetailsChild}
                          />
                        </section>
                      );
                    }

                    if (section.name === 'altimetricProfile' && displayAltimetricProfile === true) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="details_altimetricProfile"
                            titleId="details.altimetricProfile"
                            className={marginDetailsChild}
                          >
                            <div className="h-90" id="altimetric-profile"></div>
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (section.name === 'sensitiveAreas' && details.sensitiveAreas.length > 0) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="details_sensitiveAreas"
                            titleId="details.sensitiveAreasTitle"
                            className={marginDetailsChild}
                          >
                            <span className="mb-4 desktop:mb-8">
                              <FormattedMessage id="details.sensitiveAreasIntro" />
                            </span>
                            {details.sensitiveAreas.map((sensitiveArea, i) => (
                              <DetailsSensitiveArea
                                key={i}
                                {...sensitiveArea}
                                className="my-4 desktop:my-8 ml-3 desktop:ml-6"
                              />
                            ))}
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (
                      section.name === 'practicalInformations' &&
                      (details.informationDesks.length > 0 ||
                        details.transport ||
                        details.access ||
                        details.labels.length > 0 ||
                        (details.advice !== null && details.advice.length > 0))
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <div
                            id="details_practicalInformations"
                            className="scroll-mt-20 desktop:scroll-mt-30"
                          />
                          {(details.labels.length > 0 ||
                            (details.advice !== null && details.advice.length > 0)) && (
                            <div id="details_recommandations_ref">
                              <DetailsSection
                                titleId="details.recommandations"
                                className={marginDetailsChild}
                              >
                                <div className="flex flex-col gap-4 desktop:gap-6">
                                  {details.advice !== null && details.advice.length > 0 && (
                                    <DetailsAdvice text={details.advice} />
                                  )}
                                  {details.gear !== null && <DetailsGear text={details.gear} />}
                                  {details.labels.map(label => (
                                    <DetailsLabel
                                      key={label.id}
                                      id={label.id}
                                      name={label.name}
                                      advice={label.advice}
                                      pictogramUri={label.pictogramUri}
                                    />
                                  ))}
                                </div>
                              </DetailsSection>
                            </div>
                          )}
                          {details.informationDesks.length > 0 && (
                            <DetailsSection
                              htmlId="details_informationDesks"
                              titleId="details.informationDesks"
                              className={marginDetailsChild}
                            >
                              {details.informationDesks.map((informationDesk, i) => (
                                <DetailsInformationDesk key={i} {...informationDesk} />
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
                        </section>
                      );
                    }

                    if (section.name === 'accessibility' && shouldDisplayAccessibility(details)) {
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
                            <Accessibility details={details} language={language} />
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (section.name === 'more' && details.webLinks.length > 0) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="details_more"
                            titleId="details.more"
                            className={marginDetailsChild}
                          >
                            {details.webLinks.map((link, i) => (
                              <MoreLink key={i} link={link} />
                            ))}
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (section.name === 'source' && details.sources.length > 0) {
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
                            {details.sources.map((source, i) => (
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

                    if (section.name === 'report' && getGlobalConfig().enableReport) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="details_report"
                            titleId="report.title"
                            className={marginDetailsChild}
                          >
                            <Report
                              displayMobileMap={displayMobileMap}
                              setMapId={setMapId}
                              trekId={details.id}
                              startPoint={{
                                type: 'Point',
                                coordinates: details.trekDeparture,
                              }}
                            />
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (
                      section.name === 'touristicContent' &&
                      details.touristicContents.length > 0
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
                            detailsCards={details.touristicContents.map(touristicContent => ({
                              id: `${touristicContent.id}`,
                              name: touristicContent.name ?? '',
                              place: touristicContent.category.label,
                              description: touristicContent.descriptionTeaser,
                              thumbnails: touristicContent.thumbnails,
                              attachments: touristicContent.attachments,
                              iconUri: touristicContent.category.pictogramUri,
                              iconName: touristicContent.category.label,
                            }))}
                            type="TOURISTIC_CONTENT"
                          />
                        </section>
                      );
                    }

                    if (
                      section.name === 'reservationWidget' &&
                      details.reservation &&
                      details.reservation_id !== null
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          {hasNavigator && (
                            <DetailsSection
                              className={marginDetailsChild}
                              htmlId="details_reservationWidget"
                              titleId="details.reservationWidget"
                            >
                              <DetailsReservationWidget
                                language={language}
                                reservation={details.reservation}
                                id={details.reservation_id}
                              />
                            </DetailsSection>
                          )}
                        </section>
                      );
                    }

                    // Custom HTML templates
                    if (
                      templatesVariablesAreDefinedAndUsed({
                        template: section.template,
                        id: details.id.toString(),
                        cityCode: details.cities_raw?.[0],
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
                              id={details.id.toString()}
                              type="trek"
                              cityCode={details.cities_raw[0]}
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
                id="details_mapContainer"
                className={cn(
                  'fixed inset-0 z-map left-full w-full transition',
                  'desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:left-auto desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar',
                  mobileMapState === 'DISPLAYED'
                    ? '-translate-x-full desktop:translate-x-0'
                    : 'translate-x-0',
                )}
              >
                <DetailsMapDynamicComponent
                  mapId={mapId}
                  hasZoomControl={!isMobile}
                  hideMap={hideMobileMap}
                  title={details.title}
                  arrivalLocation={details.trekArrival}
                  departureLocation={details.trekDeparture}
                  parkingLocation={
                    details.parkingLocation === null ? undefined : details.parkingLocation
                  }
                  advisedParking={details.parking}
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
                  trekFamily={trekFamily}
                  trekChildrenGeometries={details.children.reduce<TrekChildGeometry[]>(
                    (children, currentChild) => {
                      if (currentChild.childGeometry) {
                        children.push({
                          ...currentChild.childGeometry,
                          id: `TREK-${currentChild.childGeometry.id}`,
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
                      id: `${touristicContent.id}`,
                    }))}
                  sensitiveAreas={details.sensitiveAreas
                    .filter(sensitiveArea => sensitiveArea.geometry !== null)
                    .map(({ geometry, color }) => ({
                      geometry,
                      color,
                    }))}
                  trekId={Number(id)}
                  displayAltimetricProfile={displayAltimetricProfile}
                  informationDesks={details.informationDesks}
                  signage={details.signage}
                  service={details.service?.map(service => ({
                    location: { x: service.geometry.x, y: service.geometry.y },
                    pictogramUri:
                      service.type.pictogram ?? renderToStaticMarkup(<MapPin color="white" />),
                    name: service.type.name,
                    id: `DETAILS-SERVICE-${service.id}`,
                  }))}
                  infrastructure={details.infrastructure}
                  viewPoints={[
                    ...details.viewPoints,
                    ...details.pois.flatMap(({ viewPoints = [] }) => viewPoints).filter(Boolean),
                  ]}
                  displayMap={displayMobileMap}
                  setMapId={setMapId}
                />
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [
      details,
      displayAltimetricProfile,
      displayMobileMap,
      hideMobileMap,
      id,
      intl,
      isLoading,
      isMobile,
      language,
      mobileMapState,
      refetch,
      sectionsReferences,
      trekFamily,
      mapId,
    ],
  );
};

export const marginDetailsChild = 'mx-4 desktop:mx-18';

interface DetailsHeaderMobileProps {
  title: string;
}

export const DetailsHeaderMobile: React.FC<DetailsHeaderMobileProps> = ({ title: name }) => {
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

export const DetailsUI: React.FC<Props> = ({ slug, parentId, language }) => {
  return (
    <DetailsAndMapProvider>
      <VisibleSectionProvider>
        <DetailsUIWithoutContext slug={slug} parentId={parentId} language={language} />
      </VisibleSectionProvider>
    </DetailsAndMapProvider>
  );
};

import parse from 'html-react-parser';
import MoreLink from 'components/Information/MoreLink';
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
import {
  generateTouristicContentUrl,
  templatesVariablesAreDefinedAndUsed,
} from 'components/pages/details/utils';
import { VisibleSectionProvider } from 'components/pages/details/VisibleSectionContext';
import { DetailsChildrenSection } from 'components/pages/details/components/DetailsChildrenSection';
import { useCallback, useMemo, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'components/Loader';
import { useMediaPredicate } from 'react-media-hook';
import { DetailsMapDynamicComponent } from 'components/Map';
import { PageHead } from 'components/PageHead';
import { Footer } from 'components/Footer';
import { OpenMapButton } from 'components/OpenMapButton';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin } from 'components/Icons/MapPin';
import useHasMounted from 'hooks/useHasMounted';
import { ImageWithLegend } from 'components/ImageWithLegend';
import { cn } from 'services/utils/cn';
import { HtmlParser } from 'components/HtmlParser';
import { cleanHTMLElementsFromString } from '../../../modules/utils/string';
import { useOutdoorSite } from './useOutdoorSite';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { DetailsSensitiveArea } from '../details/components/DetailsSensitiveArea';
import { DetailsAndMapProvider } from '../details/DetailsAndMapContext';
import { useDetailsSections } from '../details/useDetailsSections';
import { DetailsViewPoints } from '../details/components/DetailsViewPoints';
import { DetailsFiles } from '../details/components/DetailsFiles';
import { theme } from '../../../../tailwind.config';

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
    sectionRef,
    mapId,
    setMapId,
  } = useOutdoorSite(outdoorSiteUrl, language);

  const intl = useIntl();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  /** Ref of the parent of all sections */
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const hasNavigator = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);

  const { sections, anchors } = useDetailsSections('outdoorSite');

  useOnScreenSection({
    sectionsPositions,
    // The scroll offset is the height above the sections' container minus the headers size
    // (we want the element detection to trigger when an element top reaches the header's bottom not the windows' top)
    // Note that this scrollOffset is necessary because the sections' container
    // position is relative, therefore its childrens' boundingClientRect are computed
    // relative to the relative parent.
    scrollOffset:
      (sectionsContainerRef.current?.offsetTop ?? 0) -
      parseInt(theme.spacing.desktopHeader, 10) -
      parseInt(theme.spacing[14], 10),
  });

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
          title={outdoorSiteContent?.name}
          description={cleanHTMLElementsFromString(outdoorSiteContent?.descriptionTeaser ?? '')}
          sharingImageUrl={outdoorSiteContent?.images?.[0]?.url}
        />
        {outdoorSiteContent === undefined ? (
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
                <OpenMapButton displayMap={displayMobileMap} setMapId={setMapId} />
                <div className="desktop:h-coverDetailsDesktop">
                  <Modal>
                    {({ isFullscreen, toggleFullscreen }) => (
                      <div
                        id="outdoorSiteContent_cover"
                        className={!isFullscreen ? 'desktop:h-coverDetailsDesktop' : 'h-full'}
                      >
                        {outdoorSiteContent.images.length > 1 && hasNavigator ? (
                          <DetailsCoverCarousel
                            images={outdoorSiteContent.images}
                            classNameImage={isFullscreen ? 'object-contain' : ''}
                            onClickImage={toggleFullscreen}
                          />
                        ) : (
                          <ImageWithLegend
                            image={outdoorSiteContent.images[0]}
                            classNameImage={isFullscreen ? 'object-contain' : ''}
                            onClick={toggleFullscreen}
                          />
                        )}
                      </div>
                    )}
                  </Modal>
                </div>
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
                        </section>
                      );
                    }
                    if (
                      section.name === 'medias' &&
                      ((hasNavigator && outdoorSiteContent.viewPoints.length > 0) ||
                        outdoorSiteContent.filesFromAttachments.length > 0)
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection htmlId="details_medias" className={marginDetailsChild}>
                            <DetailsFiles files={outdoorSiteContent.filesFromAttachments} />
                            {hasNavigator && (
                              <DetailsViewPoints
                                viewPoints={outdoorSiteContent.viewPoints}
                                handleViewPointClick={handleViewPointClick}
                              />
                            )}
                          </DetailsSection>
                        </section>
                      );
                    }
                    if (
                      section.name === 'poi' &&
                      outdoorSiteContent?.pois?.length &&
                      Number(outdoorSiteContent?.pois?.length) > 0
                    ) {
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
                              { count: Number(outdoorSiteContent.pois.length) },
                            )}
                            detailsCards={outdoorSiteContent.pois.map(poi => ({
                              id: `${poi.id}`,
                              name: poi.name ?? '',
                              description: poi.description,
                              thumbnails: poi.thumbnails,
                              images: poi.images,
                              iconUri: poi.type.pictogramUri,
                              iconName: poi.type.label,
                              viewPoints: poi.viewPoints,
                              filesFromAttachments: poi.filesFromAttachments,
                            }))}
                            type="POI"
                            handleViewPointClick={handleViewPointClick}
                          />
                        </section>
                      );
                    }

                    if (section.name === 'description' && outdoorSiteContent.description) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsDescription
                            cities={outdoorSiteContent.cities}
                            descriptionHtml={outdoorSiteContent.description}
                            className={marginDetailsChild}
                          />
                        </section>
                      );
                    }

                    if (
                      section.name === 'subsites' &&
                      Number(outdoorSiteContent.children?.length) > 0
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsChildrenSection
                            id="subsites"
                            items={outdoorSiteContent.children}
                            title={intl.formatMessage(
                              { id: 'outdoorSite.sitesFullTitle' },
                              { count: outdoorSiteContent.children.length },
                            )}
                            type="OUTDOOR_SITE"
                          />
                        </section>
                      );
                    }

                    if (
                      section.name === 'courses' &&
                      Number(outdoorSiteContent.courses?.length) > 0
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsChildrenSection
                            id="courses"
                            items={outdoorSiteContent.courses}
                            title={intl.formatMessage(
                              { id: 'outdoorSite.coursesFullTitle' },
                              { count: outdoorSiteContent.courses.length },
                            )}
                            type="OUTDOOR_COURSE"
                          />
                        </section>
                      );
                    }

                    if (
                      section.name === 'sensitiveAreas' &&
                      outdoorSiteContent.sensitiveAreas.length > 0
                    ) {
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
                            {outdoorSiteContent.sensitiveAreas.map((sensitiveArea, i) => (
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
                      (Number(outdoorSiteContent?.informationDesks?.length) > 0 ||
                        outdoorSiteContent.advice ||
                        Number(outdoorSiteContent?.labels?.length) > 0)
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
                          {(outdoorSiteContent.advice ||
                            Number(outdoorSiteContent?.labels?.length) > 0) && (
                            <DetailsSection
                              titleId="details.recommandations"
                              className={marginDetailsChild}
                            >
                              {outdoorSiteContent.advice && (
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
                                  <div className="content-WYSIWYG">
                                    {parse(outdoorSiteContent.accessibility)}
                                  </div>
                                </div>
                              )}
                            </DetailsSection>
                          )}
                          <DetailsSection
                            htmlId="details_informationDesks"
                            titleId="details.informationDesks"
                            className={marginDetailsChild}
                          >
                            {outdoorSiteContent?.informationDesks?.map((informationDesk, i) => (
                              <DetailsInformationDesk key={i} {...informationDesk} />
                            ))}
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (
                      section.name === 'access' &&
                      Number(outdoorSiteContent.access?.length) > 0
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsChildrenSection
                            id="access"
                            items={outdoorSiteContent.access}
                            title={intl.formatMessage(
                              { id: 'outdoorSite.accessFullTitle' },
                              { count: outdoorSiteContent.access.length },
                            )}
                            type="TREK"
                          />
                        </section>
                      );
                    }

                    if (
                      section.name === 'source' &&
                      Number(outdoorSiteContent?.source?.length) > 0
                    ) {
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
                            {outdoorSiteContent?.source?.map((source, i) => (
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
                      section.name === 'more' &&
                      Number(outdoorSiteContent?.webLinks?.length) > 0
                    ) {
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
                            {outdoorSiteContent?.webLinks?.map((link, i) => (
                              <MoreLink key={i} link={link} />
                            ))}
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (
                      section.name === 'touristicContent' &&
                      outdoorSiteContent.touristicContents.length > 0
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
                            detailsCards={outdoorSiteContent.touristicContents.map(
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
                        id: outdoorSiteContent.id.toString(),
                        cityCode: outdoorSiteContent.cities_raw?.[0],
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
                              id={outdoorSiteContent.id.toString()}
                              type="trek"
                              cityCode={outdoorSiteContent.cities_raw[0]}
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
                id="outdoorSiteContent_map"
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
                  courses={outdoorSiteContent.courses}
                  experiences={outdoorSiteContent.children}
                  hasZoomControl={!isMobile}
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
                  trekChildrenGeometries={[]}
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
                      service.type.pictogram ?? renderToStaticMarkup(<MapPin color="white" />),
                    name: service.type.name,
                    id: `DETAILS-SERVICE-${service.id}`,
                  }))}
                  infrastructure={outdoorSiteContent.infrastructure}
                  hideMap={hideMobileMap}
                  viewPoints={[
                    ...outdoorSiteContent.viewPoints,
                    ...outdoorSiteContent.pois
                      .flatMap(({ viewPoints = [] }) => viewPoints)
                      .filter(Boolean),
                  ]}
                  displayMap={displayMobileMap}
                  setMapId={setMapId}
                  type="OUTDOOR_SITE"
                />
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [outdoorSiteContent, isLoading, mobileMapState, sectionsReferences, hasNavigator, mapId],
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

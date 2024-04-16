import parse from 'html-react-parser';
import { Modal } from 'components/Modal';
import { DetailsAdvice } from 'components/pages/details/components/DetailsAdvice';
import { DetailsCardSection } from 'components/pages/details/components/DetailsCardSection';
import { DetailsDescription } from 'components/pages/details/components/DetailsDescription';
import { DetailsHeader } from 'components/pages/details/components/DetailsHeader';
import { DetailsSection } from 'components/pages/details/components/DetailsSection';
import { DetailsHeaderMobile, marginDetailsChild } from 'components/pages/details/Details';
import { useOnScreenSection } from 'components/pages/details/hooks/useHighlightedSection';
import {
  generateTouristicContentUrl,
  HtmlText,
  templatesVariablesAreDefinedAndUsed,
} from 'components/pages/details/utils';
import { VisibleSectionProvider } from 'components/pages/details/VisibleSectionContext';
import { useOutdoorCourse } from 'components/pages/site/useOutdoorCourse';
import { useMemo, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'components/Loader';
import { useMediaPredicate } from 'react-media-hook';
import { sizes } from 'stylesheet';
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
import { DetailsPreview } from '../details/components/DetailsPreview';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { DetailsSensitiveArea } from '../details/components/DetailsSensitiveArea';
import { useDetailsSections } from '../details/useDetailsSections';

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
    sectionRef,
  } = useOutdoorCourse(outdoorCourseUrl, language);

  const intl = useIntl();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  /** Ref of the parent of all sections */
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const hasNavigator = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);

  const { sections, anchors } = useDetailsSections('outdoorCourse');

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
          sharingImageUrl={outdoorCourseContent?.images?.[0]?.url}
        />
        {outdoorCourseContent === undefined ? (
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
                <div className="desktop:h-coverDetailsDesktop">
                  <Modal>
                    {({ toggleFullscreen, isFullscreen }) => (
                      <div
                        id="outdoorCourseContent_cover"
                        className={!isFullscreen ? 'desktop:h-coverDetailsDesktop' : 'h-full'}
                      >
                        {outdoorCourseContent.images.length > 1 && hasNavigator ? (
                          <DetailsCoverCarousel
                            images={outdoorCourseContent.images}
                            classNameImage={isFullscreen ? 'object-contain' : ''}
                            onClickImage={toggleFullscreen}
                          />
                        ) : (
                          <ImageWithLegend
                            image={outdoorCourseContent.images[0]}
                            classNameImage={isFullscreen ? 'object-contain' : ''}
                            onClick={toggleFullscreen}
                          />
                        )}
                      </div>
                    )}
                  </Modal>
                </div>
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
                      pictogramUri: '',
                      label: '',
                    }}
                    type={'OUTDOOR_COURSE'}
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
                        </section>
                      );
                    }
                    if (section.name === 'description' && outdoorCourseContent.description) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsDescription
                            descriptionHtml={outdoorCourseContent.description}
                            className={marginDetailsChild}
                            cities={outdoorCourseContent.cities}
                          />
                        </section>
                      );
                    }
                    if (section.name === 'gear' && outdoorCourseContent.gear) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsDescription
                            id="details_gear"
                            descriptionHtml={outdoorCourseContent.gear}
                            className={marginDetailsChild}
                            title={<FormattedMessage id="details.gear" />}
                          />
                        </section>
                      );
                    }

                    if (section.name === 'equipment' && outdoorCourseContent.equipment) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsDescription
                            id="details_equipment"
                            descriptionHtml={outdoorCourseContent.equipment}
                            className={marginDetailsChild}
                            title={<FormattedMessage id="details.equipment" />}
                          />
                        </section>
                      );
                    }

                    if (section.name === 'poi' && Number(outdoorCourseContent?.pois?.length) > 0) {
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
                              { count: Number(outdoorCourseContent?.pois?.length) },
                            )}
                            detailsCards={outdoorCourseContent?.pois?.map(poi => ({
                              id: `${poi.id}`,
                              name: poi.name ?? '',
                              description: poi.description,
                              thumbnails: poi.thumbnails,
                              images: poi.images,
                              iconUri: poi.type.pictogramUri,
                              iconName: poi.type.label,
                            }))}
                            type="POI"
                          />
                        </section>
                      );
                    }

                    if (
                      section.name === 'sensitiveAreas' &&
                      outdoorCourseContent.sensitiveAreas.length > 0
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
                            {outdoorCourseContent.sensitiveAreas.map((sensitiveArea, i) => (
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
                      (outdoorCourseContent.advice || outdoorCourseContent.accessibility)
                    ) {
                      return (
                        <section
                          key={section.name}
                          ref={sectionRef[section.name]}
                          id={`details_${section.name}_ref`}
                        >
                          <DetailsSection
                            htmlId="details_practicalInformations"
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
                              <div className="mt-5">
                                <strong className="font-bold">
                                  <FormattedMessage id="details.accessibility" /> :{' '}
                                </strong>
                                <HtmlText>{parse(outdoorCourseContent.accessibility)}</HtmlText>
                              </div>
                            )}
                          </DetailsSection>
                        </section>
                      );
                    }

                    if (
                      section.name === 'touristicContent' &&
                      outdoorCourseContent.touristicContents.length > 0
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
                            detailsCards={outdoorCourseContent.touristicContents.map(
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
                        id: outdoorCourseContent.id.toString(),
                        cityCode: outdoorCourseContent.cities_raw?.[0],
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
                              id={outdoorCourseContent.id.toString()}
                              type="trek"
                              cityCode={outdoorCourseContent.cities_raw[0]}
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
                id="outdoorCourseContent_map"
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
                  trekChildrenGeometries={[]}
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
                      service.type.pictogram ?? renderToStaticMarkup(<MapPin color="white" />),
                    name: service.type.name,
                    id: `DETAILS-SERVICE-${service.id}`,
                  }))}
                  infrastructure={outdoorCourseContent.infrastructure}
                  hideMap={hideMobileMap}
                />
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [outdoorCourseContent, isLoading, mobileMapState, hasNavigator],
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

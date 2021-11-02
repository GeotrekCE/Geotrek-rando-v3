import { Layout } from 'components/Layout/Layout';
import { Modal } from 'components/Modal';
import { DetailsAdvice } from 'components/pages/details/components/DetailsAdvice';
import { DetailsCardSection } from 'components/pages/details/components/DetailsCardSection';
import { DetailsDescription } from 'components/pages/details/components/DetailsDescription';
import { DetailsSection } from 'components/pages/details/components/DetailsSection';
import { marginDetailsChild } from 'components/pages/details/Details';
import { generateTouristicContentUrl } from 'components/pages/details/utils';
import { OutdoorSiteChildrenSection } from 'components/pages/site/components/OutdoorSiteChildrenSection';
import { useOutdoorCourse } from 'components/pages/site/useOutdoorCourse';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'react-loader';
import { useMediaPredicate } from 'react-media-hook';
import { colorPalette, sizes, zIndex } from 'stylesheet';
import { DetailsMapDynamicComponent } from 'components/Map';
import { PageHead } from 'components/PageHead';
import { Footer } from 'components/Footer';
import { OpenMapButton } from 'components/OpenMapButton';
import { MobileMapContainer } from 'components/pages/search';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { ImageWithLegend } from '../details/components/DetailsCoverCarousel/DetailsCoverCarousel';

interface Props {
  outdoorCourseUrl: string | string[] | undefined;
  language: string;
}

export const OutdoorCourseUI: React.FC<Props> = ({ outdoorCourseUrl, language }) => {
  const {
    id,
    outdoorCourseContent,
    isLoading,
    refetch,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
  } = useOutdoorCourse(outdoorCourseUrl, language);

  const intl = useIntl();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  return (
    <Layout>
      <PageHead
        title={outdoorCourseContent?.name}
        description={''}
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
          <div id="outdoorCourseContent_page" className="flex flex-1">
            <div
              id="outdoorCourseContent_informations"
              className="flex flex-col w-full desktop:w-3/5"
            >
              <OpenMapButton displayMap={displayMobileMap} />
              <Modal>
                {({ toggleFullscreen }) => (
                  <div id="outdoorCourseContent_cover">
                    {outdoorCourseContent.attachments.length > 1 ? (
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
              >
                <DetailsTopIcons
                  details={outdoorCourseContent}
                  practice={{
                    pictogram: '',
                    name: '',
                  }}
                  type={'OUTDOOR_COURSE'}
                />
                <DetailsPreview
                  className={marginDetailsChild}
                  informations={{
                    duration: outdoorCourseContent.duration,
                    distance: outdoorCourseContent.length,
                    elevation: outdoorCourseContent.maxElevation,
                    difficulty: null,
                    courseType: null,
                    networks: [],
                  }}
                  place={''}
                  tags={[]}
                  title={outdoorCourseContent.name}
                  teaser={''}
                  ambiance={''}
                  details={outdoorCourseContent}
                  type={'OUTDOOR_SITE'}
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
                <div id="details_poi_ref">
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
                    }))}
                    type="POI"
                  />
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
                </DetailsSection>
              )}

              {outdoorCourseContent.touristicContents.length > 0 && (
                <div id="details_touristicContent_ref">
                  <DetailsCardSection
                    htmlId="details_touristicContent"
                    title={intl.formatMessage({ id: 'details.touristicContent' })}
                    displayBadge
                    generateUrlFunction={generateTouristicContentUrl}
                    detailsCards={outdoorCourseContent.touristicContents.map(touristicContent => ({
                      id: `${touristicContent.id}`,
                      name: touristicContent.name ?? '',
                      place: touristicContent.category.label,
                      description: touristicContent.descriptionTeaser,
                      thumbnailUris: touristicContent.thumbnailUris,
                      attachments: touristicContent.attachments,
                      iconUri: touristicContent.category.pictogramUri,
                      logoUri: touristicContent.logoUri ?? undefined,
                    }))}
                    type="TOURISTIC_CONTENT"
                  />
                </div>
              )}

              <Footer />
            </div>
            {!isMobile && (
              <div
                id="details_mapContainer"
                className="desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar"
              >
                <DetailsMapDynamicComponent
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
                  sensitiveAreas={[]}
                  trekId={Number(id)}
                />
              </div>
            )}
          </div>
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
              />
            </MobileMapContainer>
          )}
        </>
      )}
    </Layout>
  );
};

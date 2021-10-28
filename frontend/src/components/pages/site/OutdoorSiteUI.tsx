import MoreLink from 'components/Information/MoreLink';
import { Layout } from 'components/Layout/Layout';
import { Modal } from 'components/Modal';
import { DetailsAdvice } from 'components/pages/details/components/DetailsAdvice';
import { DetailsCardSection } from 'components/pages/details/components/DetailsCardSection';
import { DetailsDescription } from 'components/pages/details/components/DetailsDescription';
import { DetailsInformationDesk } from 'components/pages/details/components/DetailsInformationDesk';
import { DetailsLabel } from 'components/pages/details/components/DetailsLabel';
import { DetailsSection } from 'components/pages/details/components/DetailsSection';
import { DetailsSource } from 'components/pages/details/components/DetailsSource';
import { marginDetailsChild } from 'components/pages/details/Details';
import { OutdoorCoursesChildrenSection } from 'components/pages/site/components/OutdoorCoursesChildrenSection';
import { OutdoorSiteChildrenSection } from 'components/pages/site/components/OutdoorSiteChildrenSection';
import React from 'react';
import { useIntl } from 'react-intl';
import Loader from 'react-loader';
import { useMediaPredicate } from 'react-media-hook';
import { colorPalette, sizes, zIndex } from 'stylesheet';
import { TouristicContentMapDynamicComponent } from 'components/Map';
import { PageHead } from 'components/PageHead';
import { Footer } from 'components/Footer';
import { OpenMapButton } from 'components/OpenMapButton';
import { MobileMapContainer } from 'components/pages/search';
import { useOutdoorSite } from './useOutdoorSite';
import { DetailsPreview } from '../details/components/DetailsPreview';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from '../details/components/DetailsTopIcons';
import { DetailsCoverCarousel } from '../details/components/DetailsCoverCarousel';
import { ImageWithLegend } from '../details/components/DetailsCoverCarousel/DetailsCoverCarousel';

interface Props {
  outdoorSiteUrl: string | string[] | undefined;
  language: string;
}

export const OutdoorSiteUI: React.FC<Props> = ({ outdoorSiteUrl, language }) => {
  const {
    id,
    outdoorSiteContent,
    isLoading,
    refetch,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
  } = useOutdoorSite(outdoorSiteUrl, language);

  const intl = useIntl();

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  return (
    <Layout>
      <PageHead
        title={outdoorSiteContent?.name}
        description={outdoorSiteContent?.descriptionTeaser}
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
          <div id="outdoorSiteContent_page" className="flex flex-1">
            <div
              id="outdoorSiteContent_informations"
              className="flex flex-col w-full desktop:w-3/5"
            >
              <OpenMapButton displayMap={displayMobileMap} />
              <Modal>
                {({ toggleFullscreen }) => (
                  <div id="outdoorSiteContent_cover">
                    {outdoorSiteContent.attachments.length > 1 ? (
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
              >
                <DetailsTopIcons
                  details={outdoorSiteContent}
                  practice={{
                    pictogram: '',
                    name: '',
                  }}
                  type={'OUTDOOR_SITE'}
                />
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
                  place={''}
                  tags={outdoorSiteContent.themes}
                  title={outdoorSiteContent.name}
                  teaser={outdoorSiteContent.descriptionTeaser}
                  ambiance={outdoorSiteContent.ambiance}
                  details={outdoorSiteContent}
                  type={'OUTDOOR_SITE'}
                  id={id}
                />
              </div>

              {Number(outdoorSiteContent?.children?.length) > 0 && (
                <div id="details_trekChildren_ref">
                  <OutdoorSiteChildrenSection
                    outdoorChildren={outdoorSiteContent?.children?.map(child => ({
                      ...child,
                      id: `${child.id}`,
                    }))}
                    id={id}
                    title={intl.formatMessage({ id: 'outdoorSite.childrenFullTitle' })}
                  />
                </div>
              )}

              {Number(outdoorSiteContent?.pois?.length) > 0 && (
                <div id="details_poi_ref">
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
                    }))}
                    type="POI"
                  />
                </div>
              )}

              {outdoorSiteContent.description && (
                <div id="details_description_ref">
                  <DetailsDescription
                    descriptionHtml={outdoorSiteContent.description}
                    className={marginDetailsChild}
                  />
                </div>
              )}

              {Number(outdoorSiteContent?.courses?.length) > 0 && (
                <div id="details_trekChildren_ref">
                  <OutdoorCoursesChildrenSection
                    outdoorChildren={outdoorSiteContent?.courses?.map(child => ({
                      ...child,
                      id: `${child.id}`,
                    }))}
                    id={id}
                    title={intl.formatMessage(
                      { id: 'outdoorSite.coursesFullTitle' },
                      { count: Number(outdoorSiteContent?.courses?.length) },
                    )}
                  />
                </div>
              )}

              {(outdoorSiteContent.advice || Number(outdoorSiteContent?.labels?.length) > 0) && (
                <DetailsSection
                  htmlId="details_recommandations"
                  titleId="details.recommandations"
                  className={marginDetailsChild}
                >
                  {outdoorSiteContent.advice && (
                    <DetailsAdvice text={outdoorSiteContent.advice} className="mb-4 desktop:mb-6" />
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
                </DetailsSection>
              )}

              {Number(outdoorSiteContent?.informationDesks?.length) > 0 && (
                <div id="details_practicalInformationRef">
                  <DetailsSection
                    htmlId="details_informationDesks"
                    titleId="details.informationDesks"
                    className={marginDetailsChild}
                  >
                    {outdoorSiteContent?.informationDesks?.map((informationDesk, i) => (
                      <DetailsInformationDesk
                        key={i}
                        className={
                          i < Number(outdoorSiteContent?.informationDesks?.length) - 1
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
                </div>
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

              <Footer />
            </div>
            {!isMobile && (
              <div
                id="outdoorSiteContent_map"
                className="hidden desktop:flex desktop:z-content desktop:w-2/5
              desktop:bottom-0 desktop:fixed desktop:right-0 desktop:top-desktopHeader"
              >
                <TouristicContentMapDynamicComponent
                  type="DESKTOP"
                  bbox={outdoorSiteContent.bbox}
                  touristicContentGeometry={{
                    geometry: outdoorSiteContent.geometry,
                    pictogramUri: '',
                    name: outdoorSiteContent.name,
                    id: outdoorSiteContent.id,
                  }}
                />
              </div>
            )}
          </div>
          {isMobile && (
            <MobileMapContainer
              id="outdoorSiteContent_mobileMap"
              className={`desktop:hidden fixed right-0 left-0 h-full z-map ${
                mobileMapState === 'HIDDEN' ? 'invisible' : 'flex'
              }`}
              displayState={mobileMapState}
            >
              <TouristicContentMapDynamicComponent
                type="MOBILE"
                bbox={outdoorSiteContent.bbox}
                touristicContentGeometry={{
                  geometry: outdoorSiteContent.geometry,
                  pictogramUri: '',
                  name: outdoorSiteContent.name,
                  id: outdoorSiteContent.id,
                }}
                hideMap={hideMobileMap}
              />
            </MobileMapContainer>
          )}
        </>
      )}
    </Layout>
  );
};

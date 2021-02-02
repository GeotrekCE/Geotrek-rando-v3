import { Layout } from 'components/Layout/Layout';
import Loader from 'react-loader';
import parse from 'html-react-parser';
import { MapDynamicComponent } from 'components/Map';
import { useShowOnScrollPosition } from 'hooks/useShowOnScrollPosition';
import { colorPalette, sizes, zIndex } from 'stylesheet';
import { RemoteIconInformation } from 'components/Information/RemoteIconInformation';
import { DetailsPreview } from './components/DetailsPreview';
import { DetailsSection } from './components/DetailsSection';
import { DetailsDescription } from './components/DetailsDescription';
import { DetailsHeader } from './components/DetailsHeader';
import { DetailsCardSection } from './components/DetailsCardSection';
import { useDetails } from './useDetails';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsTopIcons } from './components/DetailsTopIcons';
import { HtmlText } from './utils';
import { DetailsSource } from './components/DetailsSource';
import { useHighlightedSection } from './hooks/useHighlightedSection';

interface Props {
  detailsId: string | string[] | undefined;
}

export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  const {
    details,
    refetch,
    isLoading,
    sectionsReferences,
    setDescriptionRef,
    setPoisRef,
    setPracticalInformationsRef,
    setPreviewRef,
    setTouristicContentsRef,
    setAccessibilityRef,
    sectionsPositions,
  } = useDetails(detailsId);

  const { visibleSection } = useHighlightedSection({
    sectionsPositions,
    // We add a -200 offset so that the highlighted section doesn't change right as the top of it get out of the screen (it switches when 200 pixel of it got out of the screen)
    headerHeight:
      sizes.detailsHeaderDesktop + sizes.desktopHeader - sizes.scrollOffsetBeforeElement - 200,
  });

  return (
    <Layout>
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
        <div>
          <DetailsHeader
            sectionsReferences={sectionsReferences}
            downloadUrl={details.pdfUri}
            currentSectionId={visibleSection}
          />
          {details.title !== undefined && <DetailsHeaderMobile title={details.title} />}
          <div className="flex flex-1">
            <div
              className="flex flex-col w-full
              relative -top-detailsHeaderMobile desktop:top-0
              desktop:w-3/5"
            >
              {details.imgUrl !== null && (
                <img
                  src={details.imgUrl}
                  className="object-cover object-center overflow-hidden
                    h-coverDetailsMobile desktop:h-coverDetailsDesktop"
                />
              )}
              <div
                className="desktop:py-0
                desktop:relative desktop:-top-9
                flex flex-col"
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
                  />
                </div>

                {details.pois.length > 0 && (
                  <div ref={setPoisRef}>
                    <DetailsCardSection
                      titleId="details.poi"
                      detailsCards={details.pois.map(poi => ({
                        name: poi.name ?? '',
                        description: poi.description,
                        thumbnailUri: poi.thumbnailUri,
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

                {(details.transport || details.access_parking) && (
                  <div ref={setPracticalInformationsRef}>
                    {details.transport && (
                      <DetailsSection titleId="details.transport" className={marginDetailsChild}>
                        <HtmlText>{parse(details.transport)}</HtmlText>
                      </DetailsSection>
                    )}
                    {details.access_parking && (
                      <DetailsSection
                        titleId="details.access_parking"
                        className={marginDetailsChild}
                      >
                        <HtmlText>{parse(details.access_parking)}</HtmlText>
                      </DetailsSection>
                    )}
                  </div>
                )}

                {(details.disabledInfrastructure || details.accessibilities.length > 0) && (
                  <div ref={element => (sectionsReferences.current.accessibility = element)}>
                    <DetailsSection titleId="details.accessibility" className={marginDetailsChild}>
                      <HtmlText>{parse(details.disabledInfrastructure)}</HtmlText>
                      <div className="flex" ref={setAccessibilityRef}>
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
                      titleId="details.touristicContent"
                      detailsCards={details.touristicContents.map(touristicContent => ({
                        name: touristicContent.name ?? '',
                        place: touristicContent.category.label,
                        description: touristicContent.description,
                        thumbnailUri: touristicContent.thumbnailUri,
                        iconUri: touristicContent.category.pictogramUri,
                        logoUri: touristicContent.logoUri,
                      }))}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="hidden desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar">
              <MapDynamicComponent
                type="DESKTOP"
                arrivalLocation={details.trekArrival}
                departureLocation={details.trekDeparture}
                parkingLocation={details.parkingLocation}
                segments={details.trekGeometry}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
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

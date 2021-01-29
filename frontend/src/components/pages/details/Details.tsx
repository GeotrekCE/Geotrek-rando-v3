import { Layout } from 'components/Layout/Layout';
import { Download } from 'components/Icons/Download';
import { Printer } from 'components/Icons/Printer';
import { MapDynamicComponent } from 'components/Map';
import { useShowOnScrollPosition } from 'hooks/useShowOnScrollPosition';
import { DetailsPreview } from './components/DetailsPreview';
import { DetailsSection } from './components/DetailsSection/DetailsSection';
import { DetailsDescription } from './components/DetailsDescription';
import { DetailsHeader } from './components/DetailsHeader/DetailsHeader';
import { DetailsCardSection } from './components/DetailsCardSection';
import { useDetails } from './useDetails';
import { DetailsButton } from './components/DetailsButton';
import { DetailsButtonDropdown } from './components/DetailsButtonDropdown/DetailsButtonDropdown';
import { ErrorFallback } from '../search/components/ErrorFallback';
interface Props {
  detailsId: string | string[] | undefined;
}

export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  const { details, refetch, sectionRefs } = useDetails(detailsId);
  if (details === undefined) {
    return <ErrorFallback refetch={refetch} />;
  }

  return (
    <Layout>
      <DetailsHeader
        sections={[
          'preview',
          'poi',
          ...(details.description !== undefined ? ['description'] : []),
          ...(details.transport || details.access_parking ? ['practicalInformations'] : []),
          'accessibility',
          'toSee',
        ]}
        downloadUrl={details?.pdfUri}
      />
      {details?.title !== undefined && <DetailsHeaderMobile title={details?.title} />}
      <div className="flex flex-1">
        <div
          className="flex flex-col w-full
          relative -top-detailsHeaderMobile desktop:top-0
          desktop:w-3/5"
        >
          {details.imgUrl !== null ? (
            <img
              src={details?.imgUrl}
              className="object-cover object-center overflow-hidden
              h-coverDetailsMobile desktop:h-coverDetailsDesktop"
            />
          ) : (
            <div className="h-coverDetailsMobile desktop:h-coverDetailsDesktop" />
          )}
          <div
            className="desktop:py-0
            desktop:relative desktop:-top-9
            flex flex-col"
          >
            <div className={`${marginDetailsChild} flex flex-col`}>
              <div className="flex justify-between items-center">
                {details?.practice?.pictogram !== undefined && (
                  <ActivityLogo src={details?.practice?.pictogram} />
                )}
                <div className="hidden desktop:flex space-x-4">
                  {details?.pdfUri !== undefined && (
                    <DetailsButton url={details.pdfUri}>
                      <Printer size={30} />
                    </DetailsButton>
                  )}
                  {(details?.gpxUri !== undefined || details?.kmlUri !== undefined) && (
                    <DetailsButtonDropdown
                      options={[
                        { label: 'GPX', value: details.gpxUri },
                        { label: 'KML', value: details.kmlUri },
                      ]}
                    >
                      <Download className="text-primary1 m-2" size={30} />
                    </DetailsButtonDropdown>
                  )}
                </div>
              </div>
            </div>
            <DetailsPreview
              informations={details.informations}
              place={details.place}
              tags={details.tags}
              title={details.title}
              className={marginDetailsChild}
            />
            {details.pois.length > 0 && (
              <>
                <div ref={e => (sectionRefs.current.poi = e)} />
                <DetailsCardSection
                  titleId="details.poi"
                  detailsCards={details.pois.map(poi => ({
                    name: poi.name ?? '',
                    description: poi.description,
                    thumbnailUri: poi.thumbnailUri,
                    iconUri: poi.type.pictogramUri,
                  }))}
                />
              </>
            )}
            <div className={marginDetailsChild}></div>
            {details.description && (
              <>
                <div ref={e => (sectionRefs.current.description = e)} />
                <DetailsDescription
                  descriptionHtml={details.description}
                  className={marginDetailsChild}
                />
              </>
            )}
            {details.transport && (
              <DetailsSection titleId="details.transport" className={marginDetailsChild}>
                {details.transport}
              </DetailsSection>
            )}
            {details.access_parking && (
              <DetailsSection titleId="details.access_parking" className={marginDetailsChild}>
                {details.access_parking}
              </DetailsSection>
            )}
            {details.touristicContents.length > 0 && (
              <>
                <div ref={e => (sectionRefs.current.toSee = e)} />
                <DetailsCardSection
                  titleId="details.aroundMe"
                  detailsCards={details.touristicContents.map(touristicContent => ({
                    name: touristicContent.name ?? '',
                    place: touristicContent.category.label,
                    description: touristicContent.description,
                    thumbnailUri: touristicContent.thumbnailUri,
                    iconUri: touristicContent.category.pictogramUri,
                    logoUri: touristicContent.logoUri,
                  }))}
                />
              </>
            )}
          </div>
        </div>
        <div className="hidden desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar">
          <MapDynamicComponent
            type="DESKTOP"
            arrivalLocation={details?.trekArrival}
            departureLocation={details?.trekDeparture}
            parkingLocation={details?.parkingLocation}
            segments={details?.trekGeometry}
          />
        </div>
      </div>
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

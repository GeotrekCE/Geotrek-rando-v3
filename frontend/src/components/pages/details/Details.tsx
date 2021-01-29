import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor, sizes } from 'stylesheet';

import { Layout } from 'components/Layout/Layout';
import { Chip } from 'components/Chip';
import { Clock } from 'components/Icons/Clock';
import { Download } from 'components/Icons/Download';
import { Printer } from 'components/Icons/Printer';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { LocalIconInformation, RemoteIconInformation } from 'components/Information';
import { MapDynamicComponent } from 'components/Map';
import { useShowOnScrollPosition } from 'hooks/useShowOnScrollPosition';
import { DetailsSection } from './components/DetailsSection/DetailsSection';
import { DetailsDescription } from './components/DetailsDescription';
import { DetailsHeader } from './components/DetailsHeader/DetailsHeader';
import { DetailsCardSection } from './components/DetailsCardSection';
import { checkAndParseToList, checkAndParseToText, checkInformation } from './utils';
import { useDetails } from './useDetails';
import { DetailsButton } from './components/DetailsButton';
import { DetailsButtonDropdown } from './components/DetailsButtonDropdown/DetailsButtonDropdown';
interface Props {
  detailsId: string | string[] | undefined;
}

export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  const { details, sectionRefs } = useDetails(detailsId);
  const [hasTransport, transport] = checkAndParseToText(details, 'transport');
  const [hasAccess, access] = checkAndParseToText(details, 'access_parking');
  const [hasTeaser, description_teaser] = checkAndParseToText(details, 'description_teaser');
  const [hasAmbiance, ambiance] = checkAndParseToText(details, 'ambiance');
  const [
    hasDescription,
    introDescription,
    conclusionDescription,
    stepsDescription,
  ] = checkAndParseToList(details?.description);
  const [hasTags, tags] = [
    details !== undefined && details.tags !== undefined && details.tags.length > 0,
    details !== undefined && details.tags !== undefined ? details.tags : [],
  ];
  const hasNetworks = details?.informations?.networks;
  const hasDifficulty = !!details?.informations?.difficulty;
  const difficultyIcon = details?.informations?.difficulty?.pictogramUri ?? '';
  const difficultyLabel = details?.informations?.difficulty?.label ?? '';
  const hasCourseType = !!details?.informations?.courseType;
  const courseTypeIcon = details?.informations?.courseType?.pictogramUri ?? '';
  const courseTypeLabel = details?.informations?.courseType?.label ?? '';
  const [hasDuration, duration] = checkInformation(details, 'duration');
  const [hasElevation, elevation] = checkInformation(details, 'elevation');
  const [hasDistance, distance] = checkInformation(details, 'distance');

  return (
    <Layout>
      <DetailsHeader
        sections={[
          'preview',
          'poi',
          ...(hasDescription ? ['description'] : []),
          ...(hasTransport || hasAccess ? ['practicalInformations'] : []),
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
          {details?.imgUrl !== null ? (
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
            <div
              className={`${marginDetailsChild} flex flex-col`}
              ref={element => (sectionRefs.current.preview = element)}
            >
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
              <span
                className="text-Mobile-C2 desktop:text-P1
                mt-4 desktop:mt-12"
              >
                {details?.place}
              </span>
              <span className="text-primary1 text-Mobile-H1 desktop:text-H1 font-bold">
                {details?.title}
              </span>
              {hasTags && (
                <div className="flex flex-wrap">
                  {tags.map(tag => (
                    <Chip className="mt-4 desktop:mt-6 mr-2 desktop:mr-4" key={tag}>
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap">
                {hasDifficulty && (
                  <RemoteIconInformation iconUri={difficultyIcon} className={classNameInformation}>
                    {difficultyLabel}
                  </RemoteIconInformation>
                )}
                {hasDuration && (
                  <LocalIconInformation icon={Clock} className={classNameInformation}>
                    {duration}
                  </LocalIconInformation>
                )}
                {hasDistance && (
                  <LocalIconInformation icon={CodeBrackets} className={classNameInformation}>
                    {distance}
                  </LocalIconInformation>
                )}
                {hasElevation && (
                  <LocalIconInformation icon={TrendingUp} className={classNameInformation}>
                    {elevation}
                  </LocalIconInformation>
                )}
                {hasCourseType && (
                  <RemoteIconInformation iconUri={courseTypeIcon} className={classNameInformation}>
                    {courseTypeLabel}
                  </RemoteIconInformation>
                )}
                {hasNetworks &&
                  details?.informations.networks.map((network, i) => (
                    <RemoteIconInformation
                      iconUri={network.pictogramUri}
                      className={classNameInformation}
                      key={i}
                    >
                      {network.label}
                    </RemoteIconInformation>
                  ))}
              </div>
            </div>
            <DetailsSection className={marginDetailsChild}>
              {hasTeaser && (
                <div className="text-Mobile-C1 desktop:text-H4 font-bold">{description_teaser}</div>
              )}
              {hasAmbiance && hasTeaser && <br />}
              {hasAmbiance && <div className="text-Mobile-C1 desktop:text-P1">{ambiance}</div>}
            </DetailsSection>
            {details?.pois && details.pois.length > 0 && (
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
            {hasDescription && (
              <>
                <div ref={e => (sectionRefs.current.description = e)} />
                <DetailsDescription
                  intro={introDescription}
                  steps={stepsDescription}
                  conclusion={conclusionDescription}
                  className={marginDetailsChild}
                />
              </>
            )}
            {hasTransport && (
              <DetailsSection titleId="details.transport" className={marginDetailsChild}>
                {transport}
              </DetailsSection>
            )}
            {hasAccess && (
              <DetailsSection titleId="details.access_parking" className={marginDetailsChild}>
                {access}
              </DetailsSection>
            )}
            {details?.touristicContents && details.touristicContents.length > 0 && (
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

const classNameInformation = 'mr-6 mt-3 desktop:mt-4 text-primary1';

const ActivityLogo: React.FC<{ src: string }> = ({ src }) => (
  <div
    className="h-18 w-18 rounded-full
      hidden desktop:flex items-center justify-center
      shadow-md
    bg-primary1"
  >
    <SVG src={src} preProcessor={fillSvgWithColor(colorPalette.white)} height={53} width={53} />
  </div>
);

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

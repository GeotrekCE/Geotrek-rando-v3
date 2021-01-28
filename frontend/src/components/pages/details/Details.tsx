import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor, sizes } from 'stylesheet';

import { Layout } from 'components/Layout/Layout';
import { Chip } from 'components/Chip';
import { Clock } from 'components/Icons/Clock';
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
import { DetailsCardProps } from './components/DetailsCard/DetailsCard';
import { DetailsButton } from './components/DetailsButton';
interface Props {
  detailsId: string | string[] | undefined;
}

export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  const { details } = useDetails(detailsId);
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

  const detailsCardFakeProps: DetailsCardProps = {
    name: 'Refuge des Souffles',
    place: 'Valgaudemar',
    iconUri: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/route-return.svg',
    description:
      "Le refuge des Souffles est un beau chalet en bois, niché au milieu des derniers mélèzes de la forêt de Lautier. Ce point de passage incontournable des randonneurs et adeptes de la contemplation est située au-dessus de Villard-Loubière, au c?ur des Ecrins C'est un refuge récent qui offre une capacité de trente couchages dans de petits dortoirs équipés de couettes, une salle à manger conviviale, des douches chaudes et de grandes terrasses aménagées. Ah ! la fin d'après-midi sur les chaises longues en savourant un thé à la menthe tout en observant le col de Vaurze, dominé par la cime d'Orgière. Un vrai bonheur !",
    logoUri:
      'https://ffcam.fr/csx/scripts/resizer.php?filename=CHARTE%2FlogoL%2F8d%2F67%2F269f0f2549c50899b61197cfaf5e7574&mime=image%252Fpng&originalname=ffcam_logo_desktop.png&geometry=235x90%3E',
    thumbnailUri:
      'https://refugedessouffles.ffcam.fr/csx/scripts/resizer.php?filename=FFCAMMEDIAS%2Ffile%2Fcd%2F89%2F619&mime=image%252Fjpeg&originalname=download.jpeg&geometry=420x%3E',
  };
  const downloadUrl =
    'https://trello.com/c/8k8tcpPx/200-2-eqtu-web-je-vois-les-boutons-t%C3%A9l%C3%A9charger';

  return (
    <Layout>
      <DetailsHeader
        sections={[
          'insight',
          'poi',
          ...(hasDescription ? ['description'] : []),
          ...(hasTransport || hasAccess ? ['practicalInformations'] : []),
          'accessibility',
          'toSee',
        ]}
        downloadUrl={downloadUrl}
      />
      {details?.title !== undefined && <DetailsHeaderMobile title={details?.title} />}
      <div className="flex flex-1">
        <div
          className="flex flex-col w-full
          relative -top-detailsHeaderMobile desktop:top-0
          desktop:w-3/5"
        >
          <img
            src={details?.imgUrl}
            className="object-cover object-center overflow-hidden
            h-coverDetailsMobile desktop:h-coverDetailsDesktop"
          />
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
                <div className="hidden desktop:flex">
                  {downloadUrl !== undefined && (
                    <DetailsButton url={downloadUrl}>
                      <Printer size={30} />
                    </DetailsButton>
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
              <DetailsCardSection
                titleId="details.poi"
                detailsCards={details.pois.map(poi => ({
                  name: poi.name ?? '',
                  description: poi.description,
                  thumbnailUri: poi.thumbnailUri,
                  iconUri: poi.type.pictogramUri,
                }))}
              />
            )}
            <div className={marginDetailsChild}></div>
            {hasDescription && (
              <DetailsDescription
                intro={introDescription}
                steps={stepsDescription}
                conclusion={conclusionDescription}
                className={marginDetailsChild}
              />
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
            {
              <DetailsCardSection
                titleId="details.aroundMe"
                detailsCards={[
                  detailsCardFakeProps,
                  detailsCardFakeProps,
                  detailsCardFakeProps,
                  detailsCardFakeProps,
                ]}
              />
            }
          </div>
        </div>
        <div className="hidden desktop:flex desktop:z-content desktop:bottom-0 desktop:fixed desktop:right-0 desktop:w-2/5 desktop:top-headerAndDetailsRecapBar">
          <MapDynamicComponent
            type="DESKTOP"
            arrivalLocation={details?.trekArrival}
            departureLocation={details?.trekDeparture}
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

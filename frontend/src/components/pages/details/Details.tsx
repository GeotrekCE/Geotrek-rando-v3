import { Layout } from 'components/Layout/Layout';
import { Chip } from 'components/Chip';
import { Clock } from 'components/Icons/Clock';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { LocalIconInformation, RemoteIconInformation } from 'components/Information';
import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { DetailsSection } from './components/DetailsSection/DetailsSection';
import { useDetails } from './useDetails';
import { checkAndParseToList, checkAndParseToText, checkInformation } from './utils';
import { DetailsDescription } from './components/DetailsDescription';
import { DetailsHeader } from './components/DetailsHeader/DetailsHeader';
interface Props {
  detailsId: string | string[] | undefined;
}

export const DetailsUI: React.FC<Props> = ({ detailsId }) => {
  const { details } = useDetails(detailsId);
  const [hasTransport, transport] = checkAndParseToText(details, 'transport');
  const [hasAccess, access] = checkAndParseToText(details, 'access_parking');
  const [hasTeaser, description_teaser] = checkAndParseToText(details, 'description_teaser');
  const [hasAmbiance, ambiance] = checkAndParseToText(details, 'ambiance');
  const [hasDescription, introDescription, stepsDescription] = checkAndParseToList(
    details?.description,
  );
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
          'insight',
          'poi',
          ...(hasDescription ? ['description'] : []),
          ...(hasTransport || hasAccess ? ['practicalInformations'] : []),
          'accessibility',
          'toSee',
        ]}
      />
      <div className="flex flex-1">
        <div className="flex flex-col w-full desktop:w-3/5">
          <img
            src={details?.imgUrl}
            className="object-cover object-center overflow-hidden
            h-coverDetailsMobile desktop:h-coverDetailsDesktop"
          />
          <div
            className="px-4 desktop:px-18 desktop:py-0
            desktop:relative desktop:-top-9
            flex flex-col"
          >
            {details?.practice?.pictogram !== undefined && (
              <ActivityLogo src={details?.practice?.pictogram} />
            )}
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
            <div
              className="py-4 desktop:py-12
              border-solid border-greySoft border-b"
            >
              {hasTeaser && (
                <div className="text-Mobile-C1 desktop:text-H4 font-bold">{description_teaser}</div>
              )}
              {hasAmbiance && hasTeaser && <br />}
              {hasAmbiance && <div className="text-Mobile-C1 desktop:text-P1">{ambiance}</div>}
            </div>
            {hasDescription && (
              <DetailsDescription intro={introDescription} steps={stepsDescription} />
            )}
            {hasTransport && (
              <DetailsSection titleId="details.transport">{transport}</DetailsSection>
            )}
            {hasAccess && (
              <DetailsSection titleId="details.access_parking">{access}</DetailsSection>
            )}
          </div>
        </div>
        <div className="desktop:flex-1 bg-greySoft h-screen" />
      </div>
    </Layout>
  );
};

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

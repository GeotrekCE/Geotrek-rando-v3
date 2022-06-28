import { Altitude } from 'components/Icons/Altitude';
import { Calendar } from 'components/Icons/Calendar';
import { Height } from 'components/Icons/Height';
import { Modal } from 'components/Modal';
import { DetailsCoverCarousel } from 'components/pages/details/components/DetailsCoverCarousel';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';

import { borderRadius, colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';
import { flexGap } from 'services/cssHelpers';

import { Chip } from 'components/Chip';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import { LocalIconInformation, RemoteIconInformation } from 'components/Information';
import { TouristicContentDetailsType } from 'modules/touristicContent/interface';

import { Clock } from 'components/Icons/Clock';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { ListAndMapContext } from 'modules/map/ListAndMapContext';

import { Attachment } from '../../../../../modules/interface';
import { dataUnits } from '../../../../../modules/results/adapter';
import { ResultCardCarousel } from './ResultCardCarousel';

interface BaseProps {
  id: string;
  hoverId: string | null;
  place: string | null;
  title: string;
  tags: string[];
  thumbnailUris: string[];
  redirectionUrl: string;
  attachments?: Attachment[];
  badgeIconUri?: string;
  badgeName?: string;
  className?: string;
}

interface TrekProps extends BaseProps {
  type: 'TREK';
  informations: {
    duration: string | null;
    distance: string;
    elevation: string;
    difficulty?: { label: string; pictogramUri: string } | null;
    reservationSystem: number | null;
  };
}

interface TouristicContentProps extends BaseProps {
  type: 'TOURISTIC_CONTENT';
  informations: TouristicContentDetailsType[];
}

interface OutdoorSiteProps extends BaseProps {
  type: 'OUTDOOR_SITE';
  informations: TouristicContentDetailsType[];
}

interface OutdoorCourseProps extends BaseProps {
  type: 'OUTDOOR_COURSE';
  informations: {
    duration: string | null;
    elevation?: string | null;
    maxElevation?: number;
    height: string | null;
    length: string | null;
  };
}

interface TouristicEventProps extends BaseProps {
  type: 'TOURISTIC_EVENT';
  informations: Record<any, any>;
}

const isTrek = (
  content:
    | TrekProps
    | TouristicContentProps
    | OutdoorSiteProps
    | OutdoorCourseProps
    | TouristicEventProps,
): content is TrekProps => content.type === 'TREK';

const isOutdoorCourse = (
  content:
    | TrekProps
    | TouristicContentProps
    | OutdoorSiteProps
    | OutdoorCourseProps
    | TouristicEventProps,
): content is OutdoorCourseProps => content.type === 'OUTDOOR_COURSE';

const isTouristicEvent = (
  content:
    | TrekProps
    | TouristicContentProps
    | OutdoorSiteProps
    | OutdoorCourseProps
    | TouristicEventProps,
): content is TouristicEventProps => content.type === 'TOURISTIC_EVENT';

export const ResultCard: React.FC<
  (
    | TrekProps
    | TouristicContentProps
    | OutdoorSiteProps
    | OutdoorCourseProps
    | TouristicEventProps
  ) & { asColumn?: boolean }
> = props => {
  const {
    id,
    hoverId,
    place,
    title,
    tags,
    thumbnailUris,
    attachments,
    badgeIconUri,
    badgeName,
    className,
    redirectionUrl,
    type,
    asColumn,
  } = props;
  const { setHoveredCardId } = useContext(ListAndMapContext);

  const intl = useIntl();

  return (
    <Container
      onMouseEnter={() => {
        setHoveredCardId(hoverId);
      }}
      onMouseLeave={() => {
        setHoveredCardId(null);
      }}
      className={className}
      id="result_card"
      asColumn={asColumn}
    >
      <Modal>
        {({ isFullscreen, toggleFullscreen }) => (
          <>
            {isFullscreen && attachments && attachments.length > 0 && (
              <DetailsCoverCarousel attachments={attachments} />
            )}
            {(!isFullscreen || !attachments) && (
              <ResultCardCarousel
                asColumn={asColumn}
                type={type}
                thumbnailUris={thumbnailUris}
                iconUri={badgeIconUri}
                iconName={badgeName as string}
                onClickImage={attachments ? toggleFullscreen : undefined}
              />
            )}
          </>
        )}
      </Modal>

      <Link href={redirectionUrl} testId={`Link-ResultCard-${id}`} className="w-full">
        <DetailsContainer>
          <DetailsLayout>
            {place !== null && <Place>{place}</Place>}

            <Title>{title}</Title>

            <TagContainer>
              <TagLayout>
                {tags
                  .filter(tag => tag !== null && Number(tag?.length) > 0)
                  .map(tag => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
              </TagLayout>
            </TagContainer>
            {isTouristicEvent(props) && (
              <InformationContainer>
                {props.informations.date && (
                  <LocalIconInformation icon={Calendar}>
                    {props.informations.date.beginDate === props.informations.date.endDate ? (
                      <FormattedMessage
                        id={'dates.singleDate'}
                        values={{ date: intl.formatDate(props.informations.date.beginDate) }}
                      />
                    ) : (
                      <FormattedMessage
                        id={'dates.multipleDates'}
                        values={{
                          beginDate: intl.formatDate(props.informations.date.beginDate),
                          endDate: intl.formatDate(props.informations.date.endDate),
                        }}
                      />
                    )}
                  </LocalIconInformation>
                )}
              </InformationContainer>
            )}
            {isOutdoorCourse(props) && (
              <InformationContainer>
                <InformationLayout>
                  {props.informations.duration && (
                    <LocalIconInformation icon={Clock}>
                      {props.informations.duration}
                    </LocalIconInformation>
                  )}
                  {props.informations.elevation && (
                    <LocalIconInformation icon={TrendingUp}>
                      {props.informations.elevation}
                    </LocalIconInformation>
                  )}
                  {props.informations.maxElevation && (
                    <LocalIconInformation icon={Altitude}>
                      {props.informations.maxElevation}
                      {dataUnits.distance}
                    </LocalIconInformation>
                  )}
                  {props.informations.length && (
                    <LocalIconInformation icon={CodeBrackets}>
                      {props.informations.length}
                    </LocalIconInformation>
                  )}
                  {props.informations.height && (
                    <LocalIconInformation icon={Height}>
                      {props.informations.height}
                    </LocalIconInformation>
                  )}
                </InformationLayout>
              </InformationContainer>
            )}
            {isTrek(props) && (
              <InformationContainer>
                <InformationLayout>
                  {props.informations.difficulty && (
                    <RemoteIconInformation iconUri={props.informations.difficulty.pictogramUri}>
                      {props.informations.difficulty.label}
                    </RemoteIconInformation>
                  )}
                  {props.informations.duration && (
                    <LocalIconInformation icon={Clock}>
                      {props.informations.duration}
                    </LocalIconInformation>
                  )}
                  {props.informations.distance && (
                    <LocalIconInformation icon={CodeBrackets}>
                      {props.informations.distance}
                    </LocalIconInformation>
                  )}
                  {props.informations.elevation && (
                    <LocalIconInformation icon={TrendingUp} className="desktop:flex hidden">
                      {props.informations.elevation}
                    </LocalIconInformation>
                  )}
                </InformationLayout>
              </InformationContainer>
            )}
            {!isTrek(props) && !isOutdoorCourse(props) && !isTouristicEvent(props) && (
              <InformationContainer>
                {props.informations.map(
                  ({ label, values }) =>
                    values.length > 0 && (
                      <div key={label} className="text-greyDarkColored">
                        <span className="font-bold">{`${label} : `}</span>
                        {values.join(', ')}
                      </div>
                    ),
                )}
              </InformationContainer>
            )}
          </DetailsLayout>
          {isTrek(props) &&
            props.informations.reservationSystem !== null &&
            false && ( // we disable this button because the booking behaviour is not implemented yet
              <BookingButtonContainer>
                <Button>
                  <FormattedMessage id="search.book" />
                </Button>
              </BookingButtonContainer>
            )}
        </DetailsContainer>
      </Link>
    </Container>
  );
};

const Container = styled.div<{ asColumn?: boolean }>`
  display: flex;
  flex: auto;
  flex-direction: column;
  cursor: pointer;
  border: 1px solid ${colorPalette.greySoft.DEFAULT};
  transition: all 500ms;
  &:hover {
    border-color: ${colorPalette.blackSemiTransparent};
  }
  border-radius: ${borderRadius.card};
  overflow: hidden;
  // Fix for overflow hidden with border radius in Safari, see https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: radial-gradient(white, black);

  align-items: stretch;

  ${({ asColumn }) =>
    asColumn !== true &&
    desktopOnly(
      css`
        flex-direction: row;
      `,
    )}
`;

const DetailsContainer = styled.div`
  display: flex;
  width: 100%;

  padding: ${getSpacing(4)};

  ${desktopOnly(
    css`
      padding: ${getSpacing(6)};
    `,
  )}
`;

const DetailsLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BookingButtonContainer = styled.div`
  margin-left: ${getSpacing(4)};
  display: none;

  ${desktopOnly(
    css`
      display: block;
    `,
  )}
`;

const Place = styled.span`
  color: ${colorPalette.greyDarkColored};
  ${typography.small}
`;

const Title = styled.span`
  margin-top: ${getSpacing(1)};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${typography.h3}
  color: ${colorPalette.primary1};

  ${desktopOnly(
    css`
      text-overflow: clip;
      white-space: normal;
    `,
  )}
`;

const TagContainer = styled.div`
  display: flex;
  margin-top: ${getSpacing(2)};

  ${desktopOnly(
    css`
      margin-top: ${getSpacing(4)};
    `,
  )}
`;

const TagLayout = styled.div`
  ${flexGap(getSpacing(2))}

  ${desktopOnly(
    css`
      ${flexGap(getSpacing(4))}
    `,
  )}
`;

const InformationContainer = styled.div`
  margin-top: ${getSpacing(4)};
`;

const InformationLayout = styled.div`
  ${flexGap(getSpacing(2))}
  ${desktopOnly(
    css`
      ${flexGap(getSpacing(4))}
    `,
  )}
`;

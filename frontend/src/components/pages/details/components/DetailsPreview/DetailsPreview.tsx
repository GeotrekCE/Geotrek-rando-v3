import Image from 'next/image';
import { Altitude } from 'components/Icons/Altitude';
import { Calendar } from 'components/Icons/Calendar';
import { Clock } from 'components/Icons/Clock';
import { Chip } from 'components/Chip';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { MeetingPoint } from 'components/Icons/MeetingPoint';
import { Orientation } from 'components/Icons/Orientation';
import { Participant } from 'components/Icons/Participant';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { Wind } from 'components/Icons/Wind';
import OfflineButton from 'components/pages/details/components/OfflineButton';
import { groupBy } from 'modules/utils/array';
import { Details, DetailsInformation, TrekFamily } from 'modules/details/interface';
import { RemoteIconInformation } from 'components/Information/RemoteIconInformation';
import { LocalIconInformation } from 'components/Information/LocalIconInformation';
import parse from 'html-react-parser';
import { Separator } from 'components/Separator';
import {
  TouristicContentDetails,
  TouristicContentDetailsType,
} from 'modules/touristicContent/interface';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ToolTip from 'components/ToolTip';
import { cn } from 'services/utils/cn';
import { ContentType } from 'modules/interface';
import { OutdoorCourseDetails } from 'modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { dataUnits } from 'modules/results/adapter';
import { TouristicEventDetails } from 'modules/touristicEvent/interface';
import { DetailsTrekFamilyCarousel } from '../DetailsTrekFamilyCarousel';
import { DetailsTrekParentButton } from '../DetailsTrekParentButton';
import DetailsBreadcrumb from './DetailsBreadcrumb';
import DetailsDates from '../DetailsDates';

interface DetailsPreviewInformation extends DetailsInformation {
  types?: TouristicContentDetailsType[];
  logoUri?: string | null;
  period?: string | null;
  wind?: string[];
  orientation?: string[];
  maxElevation?: number;
  participantNumber?: number;
  meetingPoint?: string;
  dates?: {
    hasEndTime: boolean;
    hasBeginTime: boolean;
    beginDate: string;
    endDate: string;
  };
}

interface DetailsPreviewProps {
  ambiance?: string | null;
  className?: string;
  informations: DetailsPreviewInformation;
  place?: string;
  tags: string[];
  teaser?: string | null;
  title: string;
  trekFamily?: TrekFamily;
  details:
    | Details
    | TouristicContentDetails
    | OutdoorSiteDetails
    | OutdoorCourseDetails
    | TouristicEventDetails;
  type: ContentType;
  id: string;
}

export const DetailsPreview: React.FC<DetailsPreviewProps> = ({
  ambiance,
  className,
  informations,
  place,
  tags,
  teaser,
  title,
  trekFamily,
  details,
  type,
  id,
}) => {
  // trekRank & trekRankLabel are only defined if trek is part of an itinerance
  const trekRank = trekFamily?.trekChildren.find(trek => trek.id === id);
  const trekRankLabel = trekRank !== undefined ? `${trekRank.rank}. ` : '';

  const intl = useIntl();

  return (
    <div
      id="details_presentation"
      className={cn(className, 'flex flex-col mt-2 desktop:mt-10 relative desktop:scroll-mt-20')}
    >
      <DetailsBreadcrumb
        title={title}
        details={details}
        type={type}
        parent={trekFamily && { id: trekFamily.parentId, name: trekFamily.parentName }}
      />
      {trekFamily && (
        <div id="details_trekFamily" className="mb-4">
          <DetailsTrekParentButton
            parentName={trekFamily.parentName}
            parentId={trekFamily.parentId}
          />
          <DetailsTrekFamilyCarousel
            parentId={trekFamily.parentId}
            trekChildren={trekFamily.trekChildren}
            trekId={id}
          />
        </div>
      )}
      {informations.logoUri && informations.logoUri.length > 0 && (
        <Image
          id="details_logo"
          className="hidden desktop:block absolute top-0 right-0 size-30 object-contain object-center"
          src={informations.logoUri}
          width={120}
          height={120}
          alt=""
        />
      )}
      <span id="details_place" className="text-Mobile-C2 desktop:text-P1">
        {place}
      </span>
      <h1
        id="details_title"
        className="text-primary1 text-Mobile-H1 desktop:text-H1 font-bold"
      >{`${trekRankLabel}${title}`}</h1>
      <div id="details_tags" className="flex flex-wrap">
        {tags
          .filter(tag => tag?.length)
          .map(tag => (
            <Chip className="mt-4 desktop:mt-6 mr-2 desktop:mr-4" key={tag}>
              {tag}
            </Chip>
          ))}
      </div>
      <div id="details_infoIcons" className="flex flex-wrap mt-3 desktop:mt-4">
        {informations.difficulty && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.difficulty' })}>
            <RemoteIconInformation
              iconUri={informations.difficulty.pictogramUri}
              className={classNameInformation}
            >
              {informations.difficulty.label}
            </RemoteIconInformation>
          </ToolTip>
        )}
        {Boolean(informations.period) && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.period' })}>
            <LocalIconInformation icon={Calendar} className={classNameInformation}>
              {informations.period}
            </LocalIconInformation>
          </ToolTip>
        )}
        {informations.orientation && informations.orientation.length > 0 && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.orientation' })}>
            <LocalIconInformation icon={Orientation} className={classNameInformation}>
              {informations.orientation
                .map(w => intl.formatMessage({ id: `Wind.${w}` }))
                .join(' - ')}
            </LocalIconInformation>
          </ToolTip>
        )}
        {informations.wind && informations.wind.length > 0 && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.wind' })}>
            <LocalIconInformation icon={Wind} className={classNameInformation}>
              {informations.wind.map(w => intl.formatMessage({ id: `Wind.${w}` })).join(' - ')}
            </LocalIconInformation>
          </ToolTip>
        )}
        {informations.dates && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.date' })}>
            <LocalIconInformation icon={Calendar} className={classNameInformation}>
              <DetailsDates dates={informations.dates} />
            </LocalIconInformation>
          </ToolTip>
        )}
        {Boolean(informations.duration) && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.duration' })}>
            <LocalIconInformation icon={Clock} className={classNameInformation}>
              {informations.duration}
            </LocalIconInformation>
          </ToolTip>
        )}
        {Boolean(informations.distance) && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.distance' })}>
            <LocalIconInformation icon={CodeBrackets} className={classNameInformation}>
              {informations.distance}
            </LocalIconInformation>
          </ToolTip>
        )}
        {Boolean(informations.elevation) && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.elevation' })}>
            <LocalIconInformation icon={TrendingUp} className={classNameInformation}>
              {informations.elevation}
            </LocalIconInformation>
          </ToolTip>
        )}
        {Boolean(informations.negativeElevation) && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.negativeElevation' })}>
            <LocalIconInformation
              icon={TrendingUp}
              iconProps={{
                className: '-scale-y-100',
              }}
              className={classNameInformation}
            >
              {informations.negativeElevation}
            </LocalIconInformation>
          </ToolTip>
        )}
        {Number(informations.maxElevation) > 0 && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.altitude' })}>
            <LocalIconInformation icon={Altitude} className={classNameInformation}>
              {informations.maxElevation}
              {dataUnits.distance}
            </LocalIconInformation>
          </ToolTip>
        )}
        {Boolean(informations.meetingPoint) && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.assemblyPoint' })}>
            <LocalIconInformation icon={MeetingPoint} className={classNameInformation}>
              {informations.meetingPoint}
            </LocalIconInformation>
          </ToolTip>
        )}
        {Number(informations.participantNumber) > 0 && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.numberOfParticipants' })}>
            <LocalIconInformation icon={Participant} className={classNameInformation}>
              {informations.participantNumber}
            </LocalIconInformation>
          </ToolTip>
        )}
        {!!informations.courseType && (
          <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.courseType' })}>
            <RemoteIconInformation
              iconUri={informations.courseType.pictogramUri}
              className={classNameInformation}
            >
              {informations.courseType.label}
            </RemoteIconInformation>
          </ToolTip>
        )}
        {Number(informations?.networks?.length) > 0 &&
          informations.networks?.map((network, i) => (
            <ToolTip toolTipText={intl.formatMessage({ id: 'tooltip.network' })} key={i}>
              <RemoteIconInformation
                iconUri={network.pictogramUri}
                className={classNameInformation}
                key={i}
              >
                {network.label}
              </RemoteIconInformation>
            </ToolTip>
          ))}
      </div>
      {informations.types !== undefined && informations.types.length > 0 && (
        <div className="mt-2 desktop:mt-4 text-Mobile-C2 desktop:text-P1">
          {informations.types.map((info, i, allTypes) => (
            <div key={i} className={`${i < allTypes.length - 1 ? 'mb-1 desktop:mb-2' : ''}`}>
              <span className="font-bold">{`${info.label} : `}</span>
              <span>{info.values.join(', ')}</span>
            </div>
          ))}
        </div>
      )}
      {'ratings' in details && details.ratings.length > 0 && (
        <div>
          {Object.entries(groupBy(details.ratings, 'scale.name')).map(([key, entry]) => (
            <div key={key} className={'my-2'}>
              {key} : {entry.map(e => e.name).join(', ')}
            </div>
          ))}
        </div>
      )}
      {'ratingsDescription' in details && details.ratingsDescription && (
        <div className={'my-2'}>
          <div className="content-WYSIWYG">{parse(details.ratingsDescription)}</div>
        </div>
      )}
      {'typeSite' in details && details.typeSite && (
        <div className={'my-2'}>
          <FormattedMessage id={'details.typeSite'} /> : {details.typeSite.name}
        </div>
      )}
      {'typeCourse' in details && details.typeCourse && (
        <div className={'my-2'}>
          <FormattedMessage id={'details.typeCourse'} /> : {details.typeCourse.name}
        </div>
      )}
      <div className="desktop:hidden mt-4">
        <OfflineButton details={details} type={type} />
      </div>
      {typeof teaser === 'string' && teaser?.length > 0 && (
        <div
          id="details_teaser"
          className="text-Mobile-C1 desktop:text-H4 font-bold mt-4 desktop:mt-9"
        >
          <div className="content-WYSIWYG">{parse(teaser)}</div>
        </div>
      )}
      {typeof ambiance === 'string' && ambiance?.length > 0 && (
        <div id="details_ambiance" className="text-Mobile-C1 desktop:text-P1 mt-4 desktop:mt-8">
          <div className="content-WYSIWYG">{parse(ambiance)}</div>
        </div>
      )}
      <Separator className="mt-6 desktop:mt-12" />
    </div>
  );
};

const classNameInformation = 'mr-3 desktop:mr-6 text-primary1 text-sm';

import { Calendar } from 'components/Icons/Calendar';
import { Clock } from 'components/Icons/Clock';
import { Chip } from 'components/Chip';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { Orientation } from 'components/Icons/Orientation';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { Wind } from 'components/Icons/Wind';
import OfflineButton from 'components/pages/details/components/OfflineButton';
import { groupBy } from 'lodash';
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
import { OutdoorCourseDetails } from '../../../../../modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from '../../../../../modules/outdoorSite/interface';
import { DetailsTrekFamilyCarousel } from '../DetailsTrekFamilyCarousel';
import { DetailsTrekParentButton } from '../DetailsTrekParentButton';
import { HtmlText } from '../../utils';

interface DetailsPreviewInformation extends DetailsInformation {
  types?: TouristicContentDetailsType[];
  logoUri?: string;
  period?: string | null;
  wind?: string[];
  orientation?: string[];
}

interface DetailsPreviewProps {
  ambiance?: string;
  className?: string;
  informations: DetailsPreviewInformation;
  place?: string;
  tags: string[];
  teaser?: string;
  title: string;
  trekFamily?: TrekFamily;
  details: Details | TouristicContentDetails | OutdoorSiteDetails | OutdoorCourseDetails;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE';
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
      id="details_preview"
      className={`${className ?? ''} flex flex-col mt-2 desktop:mt-10 relative`}
    >
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

      {informations.logoUri !== undefined && informations.logoUri.length > 0 && (
        <img
          id="details_logo"
          className="hidden desktop:block absolute top-0 right-0 h-30 w-30 object-contain object-center"
          src={informations.logoUri}
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
      <div id="details_infoIcons" className="flex flex-wrap">
        {informations.difficulty && (
          <RemoteIconInformation
            iconUri={informations.difficulty.pictogramUri}
            className={classNameInformation}
          >
            {informations.difficulty.label}
          </RemoteIconInformation>
        )}
        {informations.period && (
          <LocalIconInformation icon={Calendar} className={classNameInformation}>
            {informations.period}
          </LocalIconInformation>
        )}
        {informations.orientation && informations.orientation.length > 0 && (
          <LocalIconInformation icon={Orientation} className={classNameInformation}>
            {informations.orientation.map(w => intl.formatMessage({ id: `Wind.${w}` })).join(' - ')}
          </LocalIconInformation>
        )}
        {informations.wind && informations.wind.length > 0 && (
          <LocalIconInformation icon={Wind} className={classNameInformation}>
            {informations.wind.map(w => intl.formatMessage({ id: `Wind.${w}` })).join(' - ')}
          </LocalIconInformation>
        )}
        {informations.duration !== null && (
          <LocalIconInformation icon={Clock} className={classNameInformation}>
            {informations.duration}
          </LocalIconInformation>
        )}
        {informations.distance !== null && (
          <LocalIconInformation icon={CodeBrackets} className={classNameInformation}>
            {informations.distance}
          </LocalIconInformation>
        )}
        {informations.elevation !== null && (
          <LocalIconInformation icon={TrendingUp} className={classNameInformation}>
            {informations.elevation}
          </LocalIconInformation>
        )}
        {informations.courseType !== null && (
          <RemoteIconInformation
            iconUri={informations.courseType.pictogramUri}
            className={classNameInformation}
          >
            {informations.courseType.label}
          </RemoteIconInformation>
        )}
        {informations.networks.length > 0 &&
          informations.networks.map((network, i) => (
            <RemoteIconInformation
              iconUri={network.pictogramUri}
              className={classNameInformation}
              key={i}
            >
              {network.label}
            </RemoteIconInformation>
          ))}
      </div>
      {informations.types !== undefined && informations.types.length > 0 && (
        <div className="mt-2 desktop:mt-4 text-Mobile-C2 desktop:text-P1">
          {informations.types.map((type, i, allTypes) => (
            <div key={i} className={`${i < allTypes.length - 1 ? 'mb-1 desktop:mb-2' : ''}`}>
              <span className="font-bold">{`${type.label} : `}</span>
              <span>{type.values.join(', ')}</span>
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
        <div className={'my-2'}>{details.ratingsDescription}</div>
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

      {teaser && teaser?.length > 0 && (
        <div
          id="details_teaser"
          className="text-Mobile-C1 desktop:text-H4 font-bold mt-4 desktop:mt-9"
        >
          <HtmlText>{parse(teaser)}</HtmlText>
        </div>
      )}
      {ambiance && ambiance?.length > 0 && (
        <div id="details_ambiance" className="text-Mobile-C1 desktop:text-P1 mt-4 desktop:mt-8">
          <HtmlText>{parse(ambiance)}</HtmlText>
        </div>
      )}
      <Separator className="mt-6 desktop:mt-12" />
    </div>
  );
};

const classNameInformation = 'mr-3 desktop:mr-6 mt-3 desktop:mt-4 text-primary1';

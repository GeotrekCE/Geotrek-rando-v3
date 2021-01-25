import React from 'react';

import { Chip } from 'components/Chip';
import { Button } from 'components/Button';
import { Link } from 'components/Link';

import { Clock } from 'components/Icons/Clock';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { TrendingUp } from 'components/Icons/TrendingUp';

import { FormattedMessage } from 'react-intl';
import { LocalIconInformation, RemoteIconInformation } from 'components/Information';
import { ActivityBadge as RawActivityBadge } from './ActivityBadge';
import { useResultCard } from './useResultCard';

interface Props {
  id: number;
  place: string;
  title: string;
  tags: string[];
  thumbnailUri: string;
  badgeIconUri: string;
  informations: {
    duration: string | null;
    distance: string;
    elevation: string;
    difficulty: { label: string; pictogramUri: string } | null;
    reservationSystem: number | null;
  };
}

export const ResultCard: React.FC<Props> = ({
  id,
  place,
  title,
  tags,
  thumbnailUri,
  badgeIconUri,
  informations,
}) => {
  const { detailsPageUrl } = useResultCard(id, title);
  return (
    <Link
      href={detailsPageUrl}
      testId={`Link-ResultCard-${id}`}
      className="flex flex-col desktop:flex-row
      my-4 desktop:my-6
      desktop:h-50
      rounded-resultCard overflow-hidden
      border border-greySoft border-solid
      cursor-pointer hover:shadow-sm transition-all"
    >
      <div className="relative flex-none desktop:w-2/5">
        <img
          src={thumbnailUri}
          className="object-cover object-center h-30 desktop:h-full w-full bg-primary2"
        />
        <RawActivityBadge className="absolute top-4 left-4 bg-primary1" iconUri={badgeIconUri} />
      </div>

      <div className="flex flex-col p-4 desktop:p-6 w-full overflow-auto">
        <div className="flex justify-between">
          <span className="text-Mobile-C2 desktop:text-P1 truncate">{place}</span>
          {informations.reservationSystem !== null && (
            <div className="ml-4 hidden desktop:block">
              <Button className="h-9">
                <FormattedMessage id="search.book" />
              </Button>
            </div>
          )}
        </div>
        <span
          className={`text-Mobile-H1 desktop:H4 text-primary1 font-bold truncate ${
            informations.reservationSystem !== null ? 'desktop:relative -top-2' : ''
          }`}
        >
          {title}
        </span>
        <div className="flex flex-wrap">
          {tags.map(tag => (
            <Chip className="mt-2 desktop:mt-4 mr-2 desktop:mr-4" key={tag}>
              {tag}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap">
          {informations.difficulty !== null && (
            <RemoteIconInformation
              iconUri={informations.difficulty.pictogramUri}
              className={informationClassName}
            >
              {informations.difficulty.label}
            </RemoteIconInformation>
          )}
          {informations.duration !== null && (
            <LocalIconInformation icon={Clock} className={informationClassName}>
              {informations.duration}
            </LocalIconInformation>
          )}
          <LocalIconInformation icon={CodeBrackets} className={informationClassName}>
            {informations.distance}
          </LocalIconInformation>
          <LocalIconInformation
            icon={TrendingUp}
            className={`${informationClassName} desktop:flex hidden`}
          >
            {informations.elevation}
          </LocalIconInformation>
        </div>
      </div>
    </Link>
  );
};

const informationClassName = 'mr-6 mt-3 desktop:mt-4 text-primary1';

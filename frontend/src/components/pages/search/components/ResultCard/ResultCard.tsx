import { FormattedMessage, useIntl } from 'react-intl';
import { Modal } from 'components/Modal';
import { DetailsCoverCarousel } from 'components/pages/details/components/DetailsCoverCarousel';

import { Chip } from 'components/Chip';
import { Link } from 'components/Link';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';

import { InformationCard } from 'modules/results/interface';
import { cn } from 'services/utils/cn';
import { ContentType, ImageFromAttachment } from 'modules/interface';
import { getGlobalConfig } from 'modules/utils/api.config';
import { ResultCardCarousel } from './ResultCardCarousel';
import { InformationCardList } from './InformationCardList';

interface ResultCardProps {
  id: string;
  hoverId: string | null;
  place: string | null;
  title: string;
  type: ContentType;
  tags?: string[];
  redirectionUrl: string;
  images: ImageFromAttachment[];
  badgeIconUri?: string;
  badgeName?: string;
  className?: string;
  informations?: InformationCard[];
  asColumn?: boolean;
  titleTag?: keyof JSX.IntrinsicElements;
  isImpracticable?: boolean;
  isDateRange?: boolean;
  isTodayDate?: boolean;
  endDate?: string | null;
}

export const ResultCard: React.FC<ResultCardProps> = props => {
  const {
    asColumn,
    images,
    badgeIconUri,
    badgeName,
    className,
    hoverId,
    id,
    informations,
    place,
    redirectionUrl,
    tags,
    title,
    titleTag: TitleTag = 'h3',
    type,
    isImpracticable,
    isTodayDate,
    endDate,
  } = props;
  const intl = useIntl();
  const { setHoveredCardId } = useListAndMapContext();
  const isImpracticableState =
    getGlobalConfig().enableVigilanceAreas && Boolean(isImpracticable);

  const formattedEndDate = endDate
    ? new Date(endDate).toLocaleDateString(intl.locale || 'fr', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const isTouristicContent = type === 'TOURISTIC_CONTENT';
  const closedMessageId = isTouristicContent
    ? isTodayDate
      ? formattedEndDate
        ? 'search.filters.contentClosedTodayWithEndDate'
        : 'search.filters.contentClosedToday'
      : formattedEndDate
      ? 'search.filters.contentClosedFilteredWithEndDate'
      : 'search.filters.contentClosedFiltered'
    : isTodayDate
    ? formattedEndDate
      ? 'search.filters.trekClosedTodayWithEndDate'
      : 'search.filters.trekClosedToday'
    : formattedEndDate
    ? 'search.filters.trekClosedFilteredWithEndDate'
    : 'search.filters.trekClosedFiltered';

  const closedDefaultMessage = isTouristicContent
    ? isTodayDate
      ? formattedEndDate
        ? "Cette zone est impraticable jusqu'au {endDate}"
        : "Cette zone est impraticable jusqu'à nouvel ordre"
      : formattedEndDate
      ? "Cette zone est impraticable à la date ou période choisie, et jusqu'au {endDate}"
      : "Cette zone est impraticable à la date ou période choisie, jusqu'à nouvel ordre"
    : isTodayDate
    ? formattedEndDate
      ? "Cet itinéraire est impraticable jusqu'au {endDate}"
      : "Cet itinéraire est impraticable jusqu'à nouvel ordre"
    : formattedEndDate
    ? "Cet itinéraire est impraticable à la date ou période choisie, et jusqu'au {endDate}"
    : "Cet itinéraire est impraticable à la date ou période choisie, jusqu'à nouvel ordre";

  return (
    <div
      onMouseEnter={() => {
        setHoveredCardId(hoverId);
      }}
      onMouseLeave={() => {
        setHoveredCardId(null);
      }}
      className={cn(
        'custo-result-card flex flex-auto flex-col items-stretch border border-solid border-greySoft hover:border-blackSemiTransparent transition rounded-xl overflow-hidden',
        isImpracticableState && 'border-l-4 border-l-vigilanceClosed hover:border-l-vigilanceClosed',
        asColumn !== true && 'desktop:flex-row',
        className,
      )}
      id="result_card"
    >
      <Modal>
        {({ isFullscreen }) => (
          <>
            {isFullscreen && images.length > 0 && (
              <DetailsCoverCarousel images={images} classNameImage="object-contain" />
            )}
            {!isFullscreen && (
              <ResultCardCarousel
                asColumn={asColumn}
                type={type}
                images={images}
                iconUri={badgeIconUri}
                iconName={badgeName as string}
                redirect={redirectionUrl}
                isImpracticable={isImpracticableState}
              />
            )}
          </>
        )}
      </Modal>

      <Link href={redirectionUrl} testId={`Link-ResultCard-${id}`} className="w-full">
        <div className="flex w-full p-4 desktop:p-6">
          <div className="flex flex-col w-full">
            {place !== null && <span className="text-greyDarkColored text-sm">{place}</span>}

            <TitleTag className="mt-1 text-ellipsis overflow-hidden whitespace-nowrap font-bold text-2xl color-primary1 desktop:text-clip desktop:whitespace-normal">
              {title}
            </TitleTag>

            {isImpracticableState && (
              <div className="mt-1 text-vigilanceClosed font-bold text-sm">
                <FormattedMessage
                  id={closedMessageId}
                  defaultMessage={closedDefaultMessage}
                  values={{ endDate: formattedEndDate ?? '' }}
                />
              </div>
            )}

            {tags !== undefined && (
              <div className="mt-2 desktop:mt-4 flex flex-wrap gap-2 desktop:gap-4">
                {tags.filter(Boolean).map(tag => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            )}
            <InformationCardList informations={informations} />
          </div>
        </div>
      </Link>
    </div>
  );
};

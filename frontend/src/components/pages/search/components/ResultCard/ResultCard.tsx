import { Modal } from 'components/Modal';
import { DetailsCoverCarousel } from 'components/pages/details/components/DetailsCoverCarousel';

import { Chip } from 'components/Chip';
import { Link } from 'components/Link';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';

import { InformationCard } from 'modules/results/interface';
import { cn } from 'services/utils/cn';
import { ContentType, ImageFromAttachment } from 'modules/interface';
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
  } = props;
  const { setHoveredCardId } = useListAndMapContext();

  return (
    <div
      onMouseEnter={() => {
        setHoveredCardId(hoverId);
      }}
      onMouseLeave={() => {
        setHoveredCardId(null);
      }}
      className={cn(
        'custo-result-card flex flex-auto flex-col items-stretch border border border-solid border-greySoft hover:border-blackSemiTransparent transition rounded-xl overflow-hidden',
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

import { CardIcon } from 'components/CardIcon';
import { Link } from 'components/Link';
import { Modal } from 'components/Modal';
import { DetailsCoverCarousel } from 'components/pages/details/components/DetailsCoverCarousel';
import { HtmlText } from 'components/pages/details/utils';
import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import useHasMounted from 'hooks/useHasMounted';
import parse from 'html-react-parser';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import { Arrow } from 'components/Icons/Arrow';
import { ViewPoint } from 'modules/viewPoint/interface';
import { ImageFromAttachment } from 'modules/interface';
import { useDetailsCard } from './useDetailsCard';
import { DetailsMedias } from '../DetailsMedias';

export interface DetailsCardProps {
  id: string;
  name: string;
  place?: string;
  description?: string | null;
  images: ImageFromAttachment[];
  thumbnails: ImageFromAttachment[];
  iconUri?: string;
  iconName?: string;
  className?: string;
  redirectionUrl?: string;
  type?: string;
  viewPoints?: ViewPoint[];
  handleViewPointClick?: (id: string) => void;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  id,
  name,
  description,
  images,
  thumbnails,
  iconUri,
  iconName,
  place,
  className = '',
  redirectionUrl,
  type,
  handleViewPointClick,
  viewPoints,
}) => {
  const hasMedia = Boolean(viewPoints?.length);
  const { truncateState, toggleTruncateState, detailsCardRef } = useDetailsCard(hasMedia);
  const descriptionStyled =
    truncateState === 'TRUNCATE' ? (
      <HtmlText className="custo-result-card-description line-clamp-2 desktop:line-clamp-5 text-greyDarkColored">
        <div>{parse(description ?? '')}</div>
      </HtmlText>
    ) : (
      <HtmlText className="custo-result-card-description text-greyDarkColored">
        {parse(description ?? '')}
      </HtmlText>
    );

  const { setHoveredCardId } = useListAndMapContext();

  const hasNavigator = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);
  return (
    <li
      className={cn(
        `custo-result-card relative border border-solid border-greySoft rounded-card
  flex-none desktop:w-auto mx-1 desktop:mb-6
  hover:border-blackSemiTransparent transition-all duration-500`,
        className,
      )}
    >
      <div
        className={cn(
          `
      overflow-hidden desktop:w-auto
      h-fit desktop:flex-row
      transition-all duration-500`,
          truncateState !== 'NONE' ? 'desktop:h-auto' : 'desktop:h-55',
          truncateState === 'TRUNCATE' && hasMedia && 'desktop:h-55',
        )}
        onMouseEnter={() => {
          setHoveredCardId(id);
        }}
        onMouseLeave={() => {
          setHoveredCardId(null);
        }}
      >
        <div className="float-left flex shrink-0 h-40 desktop:h-full desktop:w-2/5 pr-2 desktop:pr-6">
          <div className="w-full">
            <Modal className="h-full">
              {({ isFullscreen, toggleFullscreen }) => (
                <>
                  {type === 'TOURISTIC_CONTENT' &&
                    redirectionUrl &&
                    images.length > 0 &&
                    hasNavigator && (
                      <DetailsCoverCarousel
                        images={isFullscreen ? images : thumbnails}
                        classNameImage={cn('object-center', isFullscreen && 'object-contain')}
                        redirect={redirectionUrl}
                      />
                    )}
                  {type !== 'TOURISTIC_CONTENT' && images.length > 0 && hasNavigator && (
                    <DetailsCoverCarousel
                      images={isFullscreen ? images : thumbnails}
                      classNameImage={cn('object-center', isFullscreen && 'object-contain')}
                      onClickImage={toggleFullscreen}
                    />
                  )}
                </>
              )}
            </Modal>
            <CardIcon iconUri={iconUri} iconName={iconName} color={getActivityColor(type)} />
          </div>
        </div>
        <div ref={detailsCardRef} className="p-2 desktop:p-6">
          {place && (
            <OptionalLink redirectionUrl={redirectionUrl}>
              <p className="text-greyDarkColored">{place}</p>
            </OptionalLink>
          )}
          <OptionalLink redirectionUrl={redirectionUrl}>
            <h3 className="mb-1 text-Mobile-C1 desktop:text-H4 text-primary1 font-bold">{name}</h3>
          </OptionalLink>
          {Boolean(description) && (
            <>
              <OptionalLink redirectionUrl={redirectionUrl}>{descriptionStyled}</OptionalLink>
              {hasNavigator && Number(viewPoints?.length) > 0 && truncateState !== 'TRUNCATE' && (
                <div className="clear-both desktop:clear-none desktop:min-w-[420px] overflow-hidden py-6">
                  <DetailsMedias
                    viewPoints={viewPoints ?? []}
                    handleViewPointClick={handleViewPointClick}
                    titleTag="h3"
                    asAccordion
                  />
                </div>
              )}
              {truncateState !== 'NONE' && (
                <button
                  className="flex m-auto desktop:mr-0 items-center text-primary1 underline shrink-0 gap-1 self-end"
                  onClick={toggleTruncateState}
                  type="button"
                  aria-hidden
                >
                  <span className="shrink-0">
                    <FormattedMessage
                      id={
                        truncateState === 'TRUNCATE'
                          ? 'details.moreInformation'
                          : 'details.lessInformation'
                      }
                    />
                  </span>
                  <Arrow
                    size={20}
                    className={cn(
                      'shrink-0 transition',
                      truncateState === 'TRUNCATE' ? 'rotate-90' : '-rotate-90',
                    )}
                  />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
};

interface OptionalLinkProps {
  redirectionUrl?: string;
  children: React.ReactNode;
}

const OptionalLink: React.FC<OptionalLinkProps> = ({ redirectionUrl, children }) => {
  return redirectionUrl !== undefined ? (
    <Link href={redirectionUrl}>{children}</Link>
  ) : (
    <>{children}</>
  );
};

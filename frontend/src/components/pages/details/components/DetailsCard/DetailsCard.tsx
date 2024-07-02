import { useId } from 'react';
import { CardIcon } from 'components/CardIcon';
import { Link } from 'components/Link';
import { Modal } from 'components/Modal';
import { DetailsCoverCarousel } from 'components/pages/details/components/DetailsCoverCarousel';
import { HtmlText } from 'components/pages/details/utils';
import useHasMounted from 'hooks/useHasMounted';
import parse from 'html-react-parser';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import { Arrow } from 'components/Icons/Arrow';
import { ViewPoint } from 'modules/viewPoint/interface';
import { FileFromAttachment, ImageFromAttachment } from 'modules/interface';
import { ViewPoint as ViewPointIcon } from 'components/Icons/ViewPoint';
import { Paperclip } from 'components/Icons/Paperclip';
import ImageWithLegend from 'components/ImageWithLegend';
import { useDetailsCard } from './useDetailsCard';
import { DetailsViewPoints } from '../DetailsViewPoints';
import { DetailsFiles } from '../DetailsFiles';

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
  filesFromAttachments?: FileFromAttachment[];
  viewPoints?: ViewPoint[];
  handleViewPointClick?: (id: string) => void;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  id,
  name,
  description,
  images = [],
  thumbnails,
  iconUri,
  iconName,
  place,
  className = '',
  redirectionUrl,
  type,
  handleViewPointClick,
  filesFromAttachments = [],
  viewPoints = [],
}) => {
  const hasMedia = Boolean(viewPoints?.length);
  const { truncateState, toggleTruncateState, detailsCardRef, setTruncateState } =
    useDetailsCard(hasMedia);

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

  const hasViewPoints = hasNavigator && viewPoints.length > 0;
  const hasFiles = filesFromAttachments.length > 0;

  const viewPointsId = useId();
  const filesId = useId();

  return (
    <li
      className={cn(
        `custo-result-card relative border border-solid border-greySoft rounded-lg
  flex-none desktop:w-auto mx-1 desktop:mb-6 overflow-hidden
  hover:border-blackSemiTransparent transition-all duration-500`,
        className,
      )}
    >
      <div
        className={cn(
          `
      relative
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
        {(hasFiles || hasViewPoints) && (
          <ul className="hidden desktop:flex absolute -top-1 right-0">
            {hasFiles && (
              <li>
                <a
                  className="block -mr-1p p-2 border border-solid border-blackSemiTransparent hover:bg-greySoft focus:bg-greySoft transition rounded-bl-lg"
                  href={`#${filesId}`}
                  onClick={() => setTruncateState('FULL')}
                >
                  <Paperclip size={20} aria-hidden />
                  <span className="sr-only">
                    <FormattedMessage
                      id="attachments.title"
                      values={{ count: filesFromAttachments.length }}
                    />
                  </span>
                </a>
              </li>
            )}
            {hasViewPoints && (
              <li>
                <a
                  className={cn(
                    'block -mr-1p p-2 border border-solid border-blackSemiTransparent hover:bg-greySoft focus:bg-greySoft transition',
                    !hasFiles && 'rounded-bl-lg',
                  )}
                  href={`#${viewPointsId}`}
                  onClick={() => setTruncateState('FULL')}
                >
                  <ViewPointIcon size={20} aria-hidden />
                  <span className="sr-only">
                    <FormattedMessage id="viewPoint.title" />
                  </span>
                </a>
              </li>
            )}
          </ul>
        )}
        <div className="flex shrink-0 h-40 desktop:float-left desktop:min-h-55 desktop:h-full desktop:w-2/5 pr-2 desktop:pr-6">
          <div className="w-full">
            <Modal className="h-full">
              {({ isFullscreen, toggleFullscreen }) => {
                return (
                  <>
                    {images.length > 1 && hasNavigator ? (
                      <DetailsCoverCarousel
                        images={isFullscreen ? images : thumbnails}
                        classNameImage={cn('object-center', isFullscreen && 'object-contain')}
                        {...(redirectionUrl
                          ? { redirect: redirectionUrl }
                          : { onClickImage: toggleFullscreen })}
                      />
                    ) : (
                      <ImageWithLegend
                        image={isFullscreen ? images[0] : thumbnails[0]}
                        classNameImage={cn('object-center', isFullscreen && 'object-contain')}
                        {...(redirectionUrl
                          ? { redirect: redirectionUrl }
                          : { onClick: toggleFullscreen })}
                      />
                    )}
                  </>
                );
              }}
            </Modal>
            <CardIcon iconUri={iconUri} iconName={iconName} type={type} />
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
              {(hasViewPoints || hasFiles) && truncateState !== 'TRUNCATE' && (
                <div className="clear-both flex flex-col gap-4 desktop:min-w-[420px] overflow-hidden desktop:-mx-6 py-6">
                  <DetailsFiles
                    className="scroll-mt-20 desktop:scroll-mt-40"
                    id={filesId}
                    files={filesFromAttachments}
                    titleTag="h3"
                    asAccordion
                  />
                  {hasViewPoints && (
                    <DetailsViewPoints
                      className="scroll-mt-20 desktop:scroll-mt-40"
                      id={viewPointsId}
                      viewPoints={viewPoints}
                      handleViewPointClick={handleViewPointClick}
                      titleTag="h3"
                      asAccordion
                    />
                  )}
                </div>
              )}
              {truncateState !== 'NONE' && (
                <button
                  className="flex m-auto desktop:mr-0 items-center text-primary1 underline shrink-0 gap-1 self-end"
                  onClick={toggleTruncateState}
                  type="button"
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
                    aria-hidden
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

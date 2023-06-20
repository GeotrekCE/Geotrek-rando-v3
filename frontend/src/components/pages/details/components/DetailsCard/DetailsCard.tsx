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
import styled from 'styled-components';
import { MAX_WIDTH_MOBILE } from 'stylesheet';
import { cn } from 'services/utils/cn';
import { Arrow } from 'components/Icons/Arrow';
import { Attachment } from '../../../../../modules/interface';
import { useDetailsCard } from './useDetailsCard';
export interface DetailsCardProps {
  id: string;
  name: string;
  place?: string;
  description?: string | null;
  attachments: Attachment[];
  thumbnails: Attachment[];
  iconUri?: string;
  iconName?: string;
  className?: string;
  redirectionUrl?: string;
  type?: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  id,
  name,
  description,
  attachments,
  thumbnails,
  iconUri,
  iconName,
  place,
  className = '',
  redirectionUrl,
  type,
}) => {
  const { truncateState, toggleTruncateState, heightState, detailsCardRef } = useDetailsCard();
  const descriptionStyled =
    truncateState === 'TRUNCATE' ? (
      <HtmlText className="line-clamp-2 desktop:line-clamp-5 text-greyDarkColored">
        <div>{parse(description ?? '')}</div>
      </HtmlText>
    ) : (
      <HtmlText className="text-greyDarkColored">{parse(description ?? '')}</HtmlText>
    );

  const { setHoveredCardId } = useListAndMapContext();

  const hasNavigator = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);

  return (
    <DetailsCardContainer
      height={heightState}
      className={cn(
        `border border-solid border-greySoft rounded-card
      flex-none overflow-hidden relative
      flex flex-col h-fit desktop:flex-row desktop:w-auto mx-1 desktop:mb-6
      hover:border-blackSemiTransparent transition-all duration-500`,
        className,
      )}
      onMouseEnter={() => {
        setHoveredCardId(id);
      }}
      onMouseLeave={() => {
        setHoveredCardId(null);
      }}
    >
      <div className="flex shrink-0 h-40 desktop:h-full desktop:w-2/5">
        <div className="w-full">
          <Modal className="h-full">
            {({ isFullscreen, toggleFullscreen }) => (
              <>
                {type === 'TOURISTIC_CONTENT' &&
                  redirectionUrl &&
                  attachments.length > 0 &&
                  hasNavigator && (
                    <DetailsCoverCarousel
                      attachments={isFullscreen ? attachments : thumbnails}
                      classNameImage={cn('object-center', isFullscreen && 'object-contain')}
                      redirect={redirectionUrl}
                    />
                  )}
                {type !== 'TOURISTIC_CONTENT' && attachments.length > 0 && hasNavigator && (
                  <DetailsCoverCarousel
                    attachments={isFullscreen ? attachments : thumbnails}
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
      <div
        ref={detailsCardRef}
        className={`flex flex-col relative
        p-2 desktop:p-6 desktop:my-auto`}
      >
        {place && (
          <OptionalLink redirectionUrl={redirectionUrl}>
            <p className="text-greyDarkColored">{place}</p>
          </OptionalLink>
        )}
        <OptionalLink redirectionUrl={redirectionUrl}>
          <h3 className="text-Mobile-C1 desktop:text-H4 text-primary1 font-bold">{name}</h3>
        </OptionalLink>
        {Boolean(description) && (
          <div
            className="mt-1 desktop:mt-4
            flex flex-col desktop:flex-row desktop:items-end
            text-Mobile-C2 desktop:text-P1 text-greyDarkColored"
          >
            <OptionalLink redirectionUrl={redirectionUrl}>{descriptionStyled}</OptionalLink>
            {truncateState !== 'NONE' && (
              <button
                className="flex items-center text-primary1 underline shrink-0 gap-1 desktop:ml-1"
                onClick={toggleTruncateState}
                type="button"
                aria-hidden
              >
                <span className="shrink-0">
                  <FormattedMessage
                    id={truncateState === 'TRUNCATE' ? 'details.readMore' : 'details.readLess'}
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
          </div>
        )}
      </div>
    </DetailsCardContainer>
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

const DetailsCardContainer = styled.li<{ height: number }>`
  @media (min-width: ${MAX_WIDTH_MOBILE}px) {
    height: ${props => props.height}px;
  }
`;

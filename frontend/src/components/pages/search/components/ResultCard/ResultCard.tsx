import { Modal } from 'components/Modal';
import { DetailsCoverCarousel } from 'components/pages/details/components/DetailsCoverCarousel';
import styled, { css } from 'styled-components';

import { borderRadius, colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';
import { flexGap } from 'services/cssHelpers';

import { Chip } from 'components/Chip';
import { Link } from 'components/Link';
import { useListAndMapContext } from 'modules/map/ListAndMapContext';

import { InformationCard } from 'modules/results/interface';
import { Attachment } from '../../../../../modules/interface';
import { ResultCardCarousel } from './ResultCardCarousel';
import { InformationCardList } from './InformationCardList';

interface ResultCardProps {
  id: string;
  hoverId: string | null;
  place: string | null;
  title: string;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_EVENT';
  tags?: string[];
  redirectionUrl: string;
  attachments: Attachment[];
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
    attachments,
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
        {({ isFullscreen }) => (
          <>
            {isFullscreen && attachments.length > 0 && (
              <DetailsCoverCarousel attachments={attachments} classNameImage="object-contain" />
            )}
            {!isFullscreen && (
              <ResultCardCarousel
                asColumn={asColumn}
                type={type}
                attachments={attachments}
                iconUri={badgeIconUri}
                iconName={badgeName as string}
                redirect={redirectionUrl}
              />
            )}
          </>
        )}
      </Modal>

      <Link href={redirectionUrl} testId={`Link-ResultCard-${id}`} className="w-full">
        <DetailsContainer>
          <DetailsLayout>
            {place !== null && <Place>{place}</Place>}

            <TitleTag className="mt-1 text-ellipsis overflow-hidden whitespace-nowrap font-bold text-2xl color-primary1 desktop:text-clip desktop:whitespace-normal">
              {title}
            </TitleTag>

            {tags !== undefined && (
              <TagContainer>
                <TagLayout>
                  {tags
                    .filter(tag => tag !== null && Number(tag?.length) > 0)
                    .map(tag => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                </TagLayout>
              </TagContainer>
            )}
            <InformationCardList informations={informations} />
          </DetailsLayout>
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

const Place = styled.span`
  color: ${colorPalette.greyDarkColored};
  ${typography.small}
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

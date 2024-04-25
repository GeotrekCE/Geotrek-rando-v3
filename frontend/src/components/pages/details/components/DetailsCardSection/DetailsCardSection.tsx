import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import { Separator } from 'components/Separator';
import styled from 'styled-components';
import { MAX_WIDTH_MOBILE, scrollBar, sizes } from 'stylesheet';
import { marginDetailsChild } from '../../Details';
import { DetailsCard, DetailsCardProps } from '../DetailsCard/DetailsCard';

interface DetailsCardSectionProps {
  displayBadge?: boolean;
  detailsCards: DetailsCardProps[];
  title: string;
  generateUrlFunction?: (id: string | number, title: string) => string;
  type: 'POI' | 'TOURISTIC_CONTENT';
  htmlId?: string;
  handleViewPointClick?: (id: string) => void;
}

export const DetailsCardSection: React.FC<DetailsCardSectionProps> = ({
  htmlId,
  detailsCards,
  title,
  displayBadge = false,
  generateUrlFunction,
  type,
  handleViewPointClick,
}) => {
  return (
    <div id={htmlId} className="pt-6 desktop:pt-12 scroll-mt-20 desktop:scroll-mt-30">
      <h2
        id="details_cardSectionTitle"
        className={`text-Mobile-H1 desktop:text-H2 font-bold ${marginDetailsChild} flex items-center`}
      >
        {title}
        {displayBadge && <Badge label={detailsCards.length} color={getActivityColor(type)} />}
      </h2>
      <ScrollContainer
        id="details_cardSectionScrollContainer"
        className="flex desktop:flex-col items-start desktop:items-stretch
        overflow-x-auto desktop:overflow-x-hidden
        overflow-y-hidden desktop:overflow-y-auto
        scroll-smooth snap-x
        pb-5 mt-4 mb-2 desktop:mb-0
        px-4 desktop:pl-18 desktop:pr-9 desktop:mr-9"
      >
        {detailsCards.map((card, i) => (
          <DetailsCard
            key={i}
            id={`DETAILS-${type}-${card.id}`}
            name={card.name}
            description={card.description}
            images={card.images}
            thumbnails={card.thumbnails}
            iconUri={card.iconUri}
            iconName={card.iconName}
            place={card.place}
            className="w-70"
            redirectionUrl={
              generateUrlFunction && card.id !== undefined
                ? generateUrlFunction(card.id, card.name)
                : undefined
            }
            type={type}
            handleViewPointClick={handleViewPointClick}
            viewPoints={card.viewPoints}
            filesFromAttachments={card.filesFromAttachments}
          />
        ))}
      </ScrollContainer>
      <div className={marginDetailsChild} id="details_cardSectionBottom">
        <Separator />
      </div>
    </div>
  );
};

interface BadgeProps {
  color: string;
  label: number;
}

export const Badge: React.FC<BadgeProps> = ({ label, color }) => {
  return (
    <div
      className="size-8
      ml-3
      rounded-lg
      grid place-items-center
      border-solid border-primary1 border-3 shadow-sm
      text-P1 desktop:text-H4 font-bold text-primary1
      "
      style={{ borderColor: color, color }}
    >
      {label}
    </div>
  );
};

const offsetTopForTitle = 70;

const ScrollContainer = styled.ul`
  &::-webkit-scrollbar {
    ${scrollBar.root}
  }
  &::-webkit-scrollbar-thumb {
    ${scrollBar.thumb}
  }
  @media (min-width: ${MAX_WIDTH_MOBILE}px) {
    max-height: calc(
      100vh - ${sizes.desktopHeader + sizes.detailsHeaderDesktop + offsetTopForTitle}px
    );
  }
`;

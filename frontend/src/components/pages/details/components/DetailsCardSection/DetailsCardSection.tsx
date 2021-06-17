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
}

export const DetailsCardSection: React.FC<DetailsCardSectionProps> = ({
  htmlId,
  detailsCards,
  title,
  displayBadge = false,
  generateUrlFunction,
  type,
}) => {
  return (
    <div id={htmlId} className="mt-6 desktop:mt-12">
      <div
        id="details_cardSectionTitle"
        className={`text-Mobile-H1 desktop:text-H2 font-bold ${marginDetailsChild} flex items-center`}
      >
        {title}
        {displayBadge && <Badge label={detailsCards.length} />}
      </div>
      <ScrollContainer
        id="details_cardSectionScrollContainer"
        className="flex desktop:flex-col items-stretch
        overflow-x-scroll desktop:overflow-x-hidden
        overflow-y-hidden desktop:overflow-y-scroll flex-nowrap
        pb-5 mt-4 mb-2 desktop:mb-0
        px-4 desktop:pl-18 desktop:pr-9 desktop:mr-9"
      >
        {detailsCards.map((card, i) => (
          <DetailsCard
            key={i}
            id={`DETAILS-${type}-${card.id}`}
            name={card.name}
            description={card.description}
            thumbnailUris={card.thumbnailUris}
            iconUri={card.iconUri}
            place={card.place}
            logoUri={card.logoUri}
            className="w-60"
            redirectionUrl={
              generateUrlFunction && card.id !== undefined
                ? generateUrlFunction(card.id, card.name)
                : undefined
            }
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
  label: number;
}

export const Badge: React.FC<BadgeProps> = ({ label }) => {
  return (
    <div
      className="h-8 w-8
      ml-3
      rounded-lg
      grid place-items-center
      border-solid border-primary1 border-3 shadow-sm
      text-P1 desktop:text-H4 font-bold text-primary1
      "
    >
      {label}
    </div>
  );
};

const offsetTopForTitle = 70;

const ScrollContainer = styled.div`
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

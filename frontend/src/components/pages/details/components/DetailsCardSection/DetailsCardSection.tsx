import { Separator } from 'components/Separator';
import styled from 'styled-components';
import { colorPalette, getSpacing, sizes } from 'stylesheet';
import { marginDetailsChild } from '../../Details';
import { DetailsCard, DetailsCardProps } from '../DetailsCard/DetailsCard';

interface DetailsCardSectionProps {
  displayBadge?: boolean;
  detailsCards: DetailsCardProps[];
  title: string;
}

export const DetailsCardSection: React.FC<DetailsCardSectionProps> = ({
  detailsCards,
  title,
  displayBadge = false,
}) => {
  return (
    <div className="mt-6 desktop:mt-12">
      <div
        className={`text-Mobile-H1 desktop:text-H2 font-bold ${marginDetailsChild} flex items-center`}
      >
        {title}
        {displayBadge && <Badge label={detailsCards.length} />}
      </div>
      <ScrollContainer
        className="flex desktop:flex-col items-stretch
        overflow-x-scroll desktop:overflow-x-hidden
        overflow-y-hidden desktop:overflow-y-scroll flex-nowrap
        pb-5 mt-4 mb-2 desktop:mb-0
        px-4 desktop:pl-18 desktop:pr-9 desktop:mr-9"
      >
        {detailsCards.map((card, i) => (
          <DetailsCard
            key={i}
            name={card.name}
            description={card.description}
            thumbnailUris={card.thumbnailUris}
            iconUri={card.iconUri}
            place={card.place}
            logoUri={card.logoUri}
          />
        ))}
      </ScrollContainer>
      <div className={marginDetailsChild}>
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
    width: ${getSpacing(2)};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colorPalette.greySoft};
    opacity: 0.5;
    border-radius: ${getSpacing(2)};
  }
  max-height: calc(
    100vh - ${sizes.desktopHeader + sizes.detailsHeaderDesktop + offsetTopForTitle}px
  );
`;

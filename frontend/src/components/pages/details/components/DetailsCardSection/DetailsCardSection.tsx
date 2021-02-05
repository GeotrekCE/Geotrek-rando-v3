import { Separator } from 'components/Separator';
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
      <div
        className="flex desktop:flex-col items-stretch
        overflow-scroll desktop:max-h-detailsCardSection flex-nowrap
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
      </div>
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

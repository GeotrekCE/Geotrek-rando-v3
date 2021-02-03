import { Separator } from 'components/Separator';
import { marginDetailsChild } from '../../Details';
import { DetailsCard, DetailsCardProps } from '../DetailsCard/DetailsCard';

interface DetailsCardSectionProps {
  detailsCards: DetailsCardProps[];
  title: string;
}

export const DetailsCardSection: React.FC<DetailsCardSectionProps> = ({ detailsCards, title }) => {
  return (
    <div className="mt-6 desktop:mt-12">
      <div className={`text-Mobile-H1 desktop:text-H2 font-bold ${marginDetailsChild}`}>
        {title}
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
            thumbnailUri={card.thumbnailUri}
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

import { FormattedMessage } from 'react-intl';
import { DetailsCard, DetailsCardProps } from '../DetailsCard/DetailsCard';

interface DetailsCardSectionProps {
  detailsCards: DetailsCardProps[];
}

export const DetailsCardSection: React.FC<DetailsCardSectionProps> = ({ detailsCards }) => {
  return (
    <div className="my-6 desktop:my-12 overflow-scroll">
      <div className="text-Mobile-H1 desktop:text-H2 font-bold">
        <FormattedMessage id={'details.poi'} />
      </div>
      <div
        className="flex desktop:flex-col desktop:space-y-6 mt-4
        items-start desktop:items-stretch"
      >
        {detailsCards.map((card, i) => (
          <DetailsCard
            key={i}
            name={card.name}
            description={card.description}
            thumbnailUri={card.thumbnailUri}
            iconUri={card.iconUri}
          />
        ))}
      </div>
    </div>
  );
};

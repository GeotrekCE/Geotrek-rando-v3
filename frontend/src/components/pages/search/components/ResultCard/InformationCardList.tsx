import { InformationCard } from 'modules/results/interface';
import { InformationCardItem } from '../InformationCardItem';

interface InformationsListProps {
  informations?: InformationCard[];
}

export const InformationCardList: React.FC<InformationsListProps> = ({ informations }) => {
  if (!informations || informations.length === 0) {
    return null;
  }
  return (
    <ul className="mt-4 flex flex-wrap gap-2 desktop:gap-4">
      {informations.map(item => (
        <li key={item.label}>
          <InformationCardItem {...item} />
        </li>
      ))}
    </ul>
  );
};

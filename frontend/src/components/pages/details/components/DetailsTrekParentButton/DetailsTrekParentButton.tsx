import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { Link } from 'components/Link';
import { generateResultDetailsUrl } from 'components/pages/search/utils';

interface DetailsTrekParentButtonProps {
  parentName: string;
  parentId: string;
  className?: string;
}

export const DetailsTrekParentButton: React.FC<DetailsTrekParentButtonProps> = ({
  parentName,
  parentId,
  className,
}) => {
  return (
    <Link href={generateResultDetailsUrl(parentId, parentName)} className={className}>
      <span className="flex items-center">
        <ArrowLeft size={20} className="mr-1" />
        <span className="underline text-Mobile-C2 desktop:text-P1">{parentName}</span>
      </span>
    </Link>
  );
};

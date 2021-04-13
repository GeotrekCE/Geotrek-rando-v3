import { SensitiveArea } from 'modules/sensitiveArea/interface';

interface DetailsSensitiveAreaProps extends SensitiveArea {
  className?: string;
}

export const DetailsSensitiveArea: React.FC<DetailsSensitiveAreaProps> = ({ name, className }) => {
  return (
    <div id="details_sensitiveArea" className={className}>
      {name !== null && <span className="font-bold text-Mobile-C1 desktop:text-H4">{name}</span>}
    </div>
  );
};

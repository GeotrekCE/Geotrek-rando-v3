export interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => {
  return <hr className={`w-full block bg-greySoft border-0 h-1p ${className ?? ''}`} />;
};

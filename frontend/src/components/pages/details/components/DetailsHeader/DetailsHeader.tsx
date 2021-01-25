import { FormattedMessage } from 'react-intl';

interface DetailsHeaderProps {
  sections: string[];
}

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({ sections }) => {
  return (
    <div
      className="hidden desktop:flex sticky top-desktopHeader z-header
      space-x-12 pt-4 pb-2.5 px-12
      shadow-md bg-white"
    >
      {sections.map(s => (
        <div
          key={s}
          className="hover:text-primary1
          pb-1 border-b-2 hover:border-primary1 border-transparent border-solid
          cursor-pointer transition-all duration-300"
        >
          <FormattedMessage id={`details.${s}`} />
        </div>
      ))}
    </div>
  );
};

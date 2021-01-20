import { FormattedMessage } from 'react-intl';

export interface DetailsSectionProps {
  titleId: string;
  text: string;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({ titleId, text }) => {
  return (
    <div
      className="flex flex-col
      py-6 desktop:py-12
      border-solid border-greySoft border-b"
    >
      <p
        className="mt-4 desktop:mt-6
        text-Mobile-H1 desktop:text-H2 font-bold"
      >
        <FormattedMessage id={titleId} />
      </p>
      {text.split('\n').map((line, i) => (
        <p
          className="mt-3 desktop:mt-4
          text-Mobile-C1 desktop:text-P1"
          key={i}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

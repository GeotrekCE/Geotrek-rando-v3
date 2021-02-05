import { FormattedMessage } from 'react-intl';
import { parseHtmlToList } from '../../utils';

interface DetailsDescriptionProps {
  descriptionHtml: string;
  className?: string;
}

export const DetailsDescription: React.FC<DetailsDescriptionProps> = ({
  descriptionHtml,
  className,
}) => {
  const [intro, conclusion, steps] = parseHtmlToList(descriptionHtml);
  return (
    <div
      className={`flex flex-col
    pt-6 desktop:pt-12
    border-solid border-greySoft border-b
    ${className ?? ''}`}
    >
      <p className="text-Mobile-H1 desktop:text-H2 font-bold">
        <FormattedMessage id="details.description" />
      </p>
      {intro !== undefined && <div className="mt-4 desktop:mt-6">{intro}</div>}
      <div className="flex flex-col my-4 desktop:my-6">
        {steps &&
          steps.map((step, i) => (
            <div key={i}>
              <Step number={i + 1} />
              <div
                className={`${i < steps.length - 1 ? 'border-solid border-primary1 border-l-3' : ''}
              ml-3.5 desktop:ml-5.5
              pl-8 desktop:pl-12`}
              >
                <div className="relative -top-7 desktop:-top-9">{step}</div>
              </div>
            </div>
          ))}
        {conclusion !== undefined && <div className="mb-4 desktop:mb-6">{conclusion}</div>}
      </div>
    </div>
  );
};

export const Step: React.FC<{ number: number }> = ({ number }) => (
  <div
    className="h-8 w-8 desktop:h-12 desktop:w-12
    rounded-full
    flex items-center justify-center
    border-solid border-primary1 border-3
    text-P1 desktop:text-H4 font-bold text-primary1
    shadow-md"
  >
    {number}
  </div>
);

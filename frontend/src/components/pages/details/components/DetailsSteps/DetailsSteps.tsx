import { FormattedMessage } from 'react-intl';

interface DetailsDescriptionProps {
  intro: JSX.Element | undefined;
  steps: Array<JSX.Element> | undefined;
}

export const DetailsSteps: React.FC<DetailsDescriptionProps> = ({ steps, intro }) => {
  return (
    <div
      className="flex flex-col
    pt-6 desktop:pt-12
    border-solid border-greySoft border-b"
    >
      <p className="text-Mobile-H1 desktop:text-H2 font-bold">
        <FormattedMessage id="details.full_description" />
      </p>
      {intro && <div className="mt-4 desktop:mt-6">{intro}</div>}
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
      </div>
    </div>
  );
};

const Step: React.FC<{ number: number }> = ({ number }) => (
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

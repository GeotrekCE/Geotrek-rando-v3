import { FormattedMessage } from 'react-intl';

interface DetailsDescriptionProps {
  steps: Array<{ title: string; text: string }>;
}

export const DetailsSteps: React.FC<DetailsDescriptionProps> = ({ steps }) => {
  return (
    <div
      className="flex flex-col
    py-6 desktop:py-12
    border-solid border-greySoft border-b"
    >
      <p className="text-Mobile-H1 desktop:text-H2 font-bold">
        <FormattedMessage id="details.steps" />
      </p>
      <div className="flex flex-col mt-4 desktop:mt-6">
        {steps.map((step, i) => (
          <>
            <Step number={i + 1} />
            <div
              className={`${i < steps.length - 1 ? 'border-solid border-primary1 border-l-3' : ''}
              ml-3.5 desktop:ml-5.5
              pl-8 desktop:pl-12`}
            >
              <div className="relative -top-7 desktop:-top-9">
                <span className="text-Mobile-C1 desktop:text-H4 font-bold">{step.title}</span>
                <p className="mt-2">{step.text}</p>
              </div>
            </div>
          </>
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

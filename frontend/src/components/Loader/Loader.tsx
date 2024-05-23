import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';

type LoaderProps = {
  className?: string;
  children?: React.ReactNode;
  loaded?: boolean;
};

const classNameAnimation = (index: number) => {
  if (index === 0) {
    return 'animation-delay-[-1.1s]';
  }
  if (index === 1) {
    return 'rotate-[30deg] animation-delay-[-1s]';
  }
  if (index === 2) {
    return 'rotate-[60deg] animation-delay-[-0.9s]';
  }
  if (index === 3) {
    return 'rotate-[90deg] animation-delay-[-0.8s]';
  }
  if (index === 4) {
    return 'rotate-[120deg] animation-delay-[-0.7s]';
  }
  if (index === 5) {
    return 'rotate-[150deg] animation-delay-[-0.6s]';
  }
  if (index === 6) {
    return 'rotate-[180deg] animation-delay-[-0.5s]';
  }
  if (index === 7) {
    return 'rotate-[210deg] animation-delay-[-0.4s]';
  }
  if (index === 8) {
    return 'rotate-[240deg] animation-delay-[-0.3s]';
  }
  if (index === 9) {
    return 'rotate-[270deg] animation-delay-[-0.2s]';
  }
  if (index === 10) {
    return 'rotate-[300deg] animation-delay-[-0.1s]';
  }
  if (index === 11) {
    return 'rotate-[330deg]';
  }
};

// Loader from https://loading.io/css/
const Loader: React.FC<LoaderProps> = ({ className = '', loaded = false, children = '' }) => {
  if (loaded === true) {
    return <>{children}</>;
  }
  return (
    <div className={`flex size-full justify-center items-center text-primary1 ${className}`}>
      <p className="sr-only" aria-live="polite">
        <FormattedMessage id="loading" />
      </p>
      <div className="relative inline-block size-15">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className={cn(
              'animate-[pulse_1.2s_linear_infinite] origin-[30px_30px]',
              classNameAnimation(index),
              "after:content-[''] after:block after:absolute after:top-1 after:left-7 after:w-1 after:h-3 after:rounded-lg after:bg-current",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;

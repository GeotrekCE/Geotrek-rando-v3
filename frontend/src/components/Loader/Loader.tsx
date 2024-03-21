import { FormattedMessage } from 'react-intl';
import { Dot } from './Loader.style';

type LoaderProps = {
  className?: string;
  children?: React.ReactNode;
  loaded?: boolean;
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
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </div>
    </div>
  );
};

export default Loader;

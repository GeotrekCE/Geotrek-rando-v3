import { Search } from 'components/Icons/Search';
import { ChangeEvent, SyntheticEvent, useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface InputWithMagnifierProps {
  value: string | null;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const InputWithMagnifier: React.FC<InputWithMagnifierProps> = ({ onChange, value, onSubmit }) => {
  const intl = useIntl();
  const inputId = useId();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form action="/search" className="flex flex-row w-full desktop:w-auto" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={inputId}>
        <FormattedMessage id="search.title" />
      </label>
      <input
        className="input !w-30 desktop:!w-55 h-10 desktop:h-12 !rounded-r-none !rounded-l-lg"
        name="text"
        id={inputId}
        onChange={onChange}
        value={value !== null ? value : ''}
        type="search"
        placeholder={intl.formatMessage({ id: 'search.textFilter' })}
      />
      <button
        type="submit"
        className="size-10 desktop:size-12 bg-primary1 rounded-r-md
        flex justify-center items-center
        active:bg-primary1-light
        "
      >
        <Search size={24} className="text-primary2" aria-hidden />
        <span className="sr-only">
          <FormattedMessage id="search.title" />
        </span>
      </button>
    </form>
  );
};

export default InputWithMagnifier;

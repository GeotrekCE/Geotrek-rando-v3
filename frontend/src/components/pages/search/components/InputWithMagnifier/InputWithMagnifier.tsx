import { Search } from 'components/Icons/Search';
import { ChangeEvent, SyntheticEvent, useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { colorPalette } from 'stylesheet';
import CustomizedInput from './CustomizedInput.style';

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
      <CustomizedInput
        className="input"
        name="text"
        id={inputId}
        onChange={onChange}
        value={value !== null ? value : ''}
        type="search"
        placeholder={intl.formatMessage({ id: 'search.textFilter' })}
      />
      <div
        className="size-10 desktop:size-12 bg-primary1 rounded-r-md
        flex justify-center items-center
        active:bg-primary1-light
        cursor-pointer
        "
      >
        <button type="submit">
          <Search size={24} color={colorPalette.primary2} />
          <span className="sr-only">
            <FormattedMessage id="search.title" />
          </span>
        </button>
      </div>
    </form>
  );
};

export default InputWithMagnifier;

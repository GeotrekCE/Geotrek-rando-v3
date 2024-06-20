import { Calendar } from 'components/Icons/Calendar';
import { ChangeEvent, useId, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { theme } from '../../../../../../tailwind.config';

interface InputDateWithMagnifierProps {
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputDateWithMagnifier: React.FC<InputDateWithMagnifierProps> = ({
  label,
  onChange,
  value,
}) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col">
      <label className="block font-bold mb-1" htmlFor={inputId}>
        {label}
      </label>
      <div className="flex flex-row">
        <input
          className="input !w-30 desktop:!w-55 h-10 desktop:h-12 !mb-3 !rounded-r-none !rounded-l-lg"
          onChange={onChange}
          id={inputId}
          ref={inputRef}
          value={value}
          type="date"
        />
        <button
          className="size-10 desktop:size-12 bg-primary1 rounded-r-md
        flex justify-center items-center
        active:bg-primary1-light
        "
          onClick={() => inputRef?.current?.showPicker()}
          type="button"
        >
          <Calendar size={24} color={theme.extend.colors.primary2} aria-hidden />
          <span className="sr-only">
            <FormattedMessage id="form.calendar" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default InputDateWithMagnifier;

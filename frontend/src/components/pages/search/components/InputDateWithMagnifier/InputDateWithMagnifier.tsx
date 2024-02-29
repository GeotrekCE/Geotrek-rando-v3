import { Calendar } from 'components/Icons/Calendar';
import { ChangeEvent, useId, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { colorPalette } from 'stylesheet';
import CustomizedInputDate from './CustomizedInputDate.style';

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
        <CustomizedInputDate
          className="input"
          onChange={onChange}
          id={inputId}
          ref={inputRef}
          value={value}
          type="date"
        />
        <button
          className="w-10 h-10 desktop:h-12 desktop:w-12 bg-primary1 rounded-r-md
        flex justify-center items-center
        active:bg-primary1-light
        "
          onClick={() => inputRef?.current?.showPicker()}
          type="button"
        >
          <Calendar size={24} color={colorPalette.primary2} />
          <span className="sr-only">
            <FormattedMessage id="form.calendar" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default InputDateWithMagnifier;

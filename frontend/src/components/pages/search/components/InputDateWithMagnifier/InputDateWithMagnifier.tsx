import { Calendar } from 'components/Icons/Calendar';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { colorPalette } from 'stylesheet';
import CustomizedInputDate from './CustomizedInputDate.style';

interface InputDateWithMagnifierProps {
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputDateWithMagnifier: FunctionComponent<InputDateWithMagnifierProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-row">
      <CustomizedInputDate
        onChange={onChange}
        value={value}
        type="text"
        onFocus={e => {
          e.target.type = 'date';
          // @ts-ignore: Unreachable code error
          e.target.showPicker();
        }}
        onBlur={e => {
          e.target.type = 'text';
        }}
        placeholder={placeholder}
      />
      <div
        className="w-10 h-10 desktop:h-12 desktop:w-12 bg-primary1 rounded-r-md
        flex justify-center items-center
        active:bg-primary1-light
        "
      >
        <div>
          <Calendar size={24} color={colorPalette.primary2} />
        </div>
      </div>
    </div>
  );
};

export default InputDateWithMagnifier;

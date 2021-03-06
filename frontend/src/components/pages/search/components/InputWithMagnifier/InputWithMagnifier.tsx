import { Search } from 'components/Icons/Search';
import React, { ChangeEvent, FunctionComponent, KeyboardEvent } from 'react';
import { useIntl } from 'react-intl';
import { colorPalette } from 'stylesheet';
import CustomizedInput from './CustomizedInput.style';

interface InputWithMagnifierProps {
  value: string | null;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

const InputWithMagnifier: FunctionComponent<InputWithMagnifierProps> = ({
  onChange,
  value,
  onButtonClick,
}) => {
  const intl = useIntl();

  const onInputEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <div className="flex flex-row w-full desktop:w-auto">
      <CustomizedInput
        onChange={onChange}
        value={value !== null ? value : ''}
        type="text"
        onKeyPress={onInputEnterPress}
        placeholder={intl.formatMessage({ id: 'search.textFilter' })}
      />
      <div
        className="w-10 h-10 desktop:h-12 desktop:w-12 bg-primary1 rounded-r-md
        flex justify-center items-center
        active:bg-primary1-light
        cursor-pointer
        "
      >
        <div onClick={onButtonClick}>
          <Search size={24} color={colorPalette.primary2} />
        </div>
      </div>
    </div>
  );
};

export default InputWithMagnifier;

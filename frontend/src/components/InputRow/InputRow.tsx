import Input from 'components/Input';
import { ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { Error, Label, Row } from './InputRow.style';

interface Props {
  label?: string;
  error?: string | null;
  type: string;
  disabled?: boolean;
  placeholder?: string;
  field: {
    accept?: string;
    name?: string;
    onBlur?: () => void;
    onChange?: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
  };
}

const InputRow: FunctionComponent<Props> = props => {
  const { error, field, label, disabled, type, placeholder } = props;
  const hasError = error !== null;

  return (
    <Row>
      {label !== undefined && <Label>{label}</Label>}
      <CustomizedInput
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        hasError={hasError}
        {...field}
      />
      {hasError && <Error>{error}</Error>}
    </Row>
  );
};

const CustomizedInput = styled(Input)`
  height: auto;
  padding: 6px;
  border-color: ${colorPalette.primary1} !important;
`;

export default InputRow;

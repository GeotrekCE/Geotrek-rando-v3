import Textarea from 'components/Textarea';
import { ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { Error, Label, Row } from './TextareaRow.style';

interface Props {
  label?: string;
  error?: string | null;
  disabled?: boolean;
  placeholder?: string;
  field: {
    name?: string;
    onBlur?: () => void;
    onChange?: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
  };
}

const TextareaRow: FunctionComponent<Props> = props => {
  const { error, field, label, disabled, placeholder } = props;
  const hasError = error !== null;

  return (
    <Row>
      {label !== undefined && <Label>{label}</Label>}
      <CustomizedTextarea
        disabled={disabled}
        placeholder={placeholder}
        hasError={hasError}
        {...field}
      />
      {hasError && <Error>{error}</Error>}
    </Row>
  );
};

const CustomizedTextarea = styled(Textarea)`
  border-color: ${colorPalette.primary1} !important;
`;

export default TextareaRow;

import Input from 'components/Input';
import { FunctionComponent } from 'react';
import { Label, Row } from 'components/InputRow/InputRow.style';
import { MessageFormatElement } from 'react-intl';

type coordinates = {
  label?: string;
  value?: string | undefined;
};
interface Props {
  coordinates: coordinates[];
  helpText?: string | MessageFormatElement[];
}

const InputRow: FunctionComponent<Props> = props => {
  return (
    <Row>
      <div className="flex gap-6">
        {props.coordinates.map(({ label, ...field }, index) => (
          <div key={index}>
            {label !== undefined && <Label>{label}</Label>}
            <Input {...field} readOnly />
          </div>
        ))}
      </div>
      {Boolean(props.helpText) && (
        <p className="text-sm">
          <em>{props.helpText}</em>
        </p>
      )}
    </Row>
  );
};

export default InputRow;

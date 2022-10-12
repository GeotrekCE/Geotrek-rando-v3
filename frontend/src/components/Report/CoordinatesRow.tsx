import Input from 'components/Input';
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

const InputRow: React.FC<Props> = props => {
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
      {props.helpText !== undefined && (
        <p className="text-sm">
          <em>{props.helpText.toString()}</em>
        </p>
      )}
    </Row>
  );
};

export default InputRow;

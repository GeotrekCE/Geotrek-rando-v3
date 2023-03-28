import { useId } from 'react';
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
  const inputId = useId();
  return (
    <div className="w-full mb-5">
      <div className="flex gap-6">
        {props.coordinates.map(({ label, ...field }, index) => (
          <div key={index}>
            {label !== undefined && (
              <label className="block font-bold mb-1" htmlFor={inputId}>
                {label}
              </label>
            )}
            <input className="input" id={inputId} {...field} readOnly />
          </div>
        ))}
      </div>
      {props.helpText !== undefined && (
        <p className="text-sm">
          <em>{props.helpText.toString()}</em>
        </p>
      )}
    </div>
  );
};

export default InputRow;

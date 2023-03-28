import { InputHTMLAttributes, useId } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  label?: string;
  error?: string | null;
  disabled?: boolean;
  placeholder?: string;
  field: InputHTMLAttributes<HTMLTextAreaElement>;
}

const TextareaRow: React.FC<Props> = props => {
  const { error, field, label } = props;
  const inputId = useId();
  const inputErrorId = useId();
  const hasError = Boolean(error);

  return (
    <div className="w-full mb-5">
      {label !== undefined && (
        <label className="block font-bold mb-1" htmlFor={inputId}>
          {label}
          {field.required === true ? (
            <>
              {' '}
              <span className="text-sm">
                <FormattedMessage id={'form.required'} />
              </span>
            </>
          ) : null}
        </label>
      )}
      <textarea
        className="textarea"
        id={inputId}
        {...field}
        {...(hasError && { ['aria-invalid']: true, ['aria-describedby']: inputErrorId })}
      />
      {hasError && (
        <p className="text-hardKO text-small mt-1" id={inputErrorId}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextareaRow;

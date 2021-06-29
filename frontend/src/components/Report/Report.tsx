import { Button } from 'components/Button';
import InputRow from 'components/InputRow';
import TextareaRow from 'components/TextareaRow';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'react-loader';

import { SelectableDropdown } from 'components/pages/search/components/FilterBar/SelectableDropdown';
import useReport from 'components/Report/useReport';
import { Option } from '../../modules/filters/interface';

interface Props {
  trekId: number;
  onRequestClose: () => void;
}

const Report: React.FC<Props> = ({ trekId, onRequestClose }) => {
  const { state, isLoading, options, setValue, submitted, submit, error } = useReport({ trekId });
  const intl = useIntl();

  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      style={{ zIndex: 901 }}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <Loader loaded={!isLoading}>
                {submitted ? (
                  <div>
                    <FormattedMessage id={'report.success'} />
                    <div className={'flex justify-center mt-4'}>
                      <Button onClick={onRequestClose}>
                        <FormattedMessage id={'page.back'} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={'font-bold text-xl mb-8'}>
                      <FormattedMessage id={'report.title'} />
                    </div>
                    <SelectableDropdown
                      name={'Activity'}
                      placeholder={'report.activity'}
                      options={options.activity}
                      selectedFilters={state.activity}
                      setFilterSelectedOptions={(options: Option[]) => {
                        setValue('activity', options);
                      }}
                      filterType={'SINGLE'}
                    />
                    <div className={'mt-8'} />
                    <SelectableDropdown
                      name={'Category'}
                      placeholder={'report.category'}
                      options={options.category}
                      selectedFilters={state.category}
                      setFilterSelectedOptions={(options: Option[]) => {
                        setValue('category', options);
                      }}
                      filterType={'SINGLE'}
                    />
                    <div className={'mt-8'} />
                    <SelectableDropdown
                      name={'Magnitude'}
                      placeholder={'report.magnitude'}
                      options={options.magnitude}
                      selectedFilters={state.magnitude}
                      setFilterSelectedOptions={(options: Option[]) => {
                        setValue('magnitude', options);
                      }}
                      filterType={'SINGLE'}
                    />
                    <div className={'mt-8'} />
                    <TextareaRow
                      label={intl.formatMessage({ id: 'report.comment' })}
                      field={{
                        value: state.comment,
                        onChange: ({ target: { value } }) => setValue('comment', value),
                      }}
                    />
                    <div className={'mt-8'} />
                    <InputRow
                      label={intl.formatMessage({ id: 'report.name' })}
                      type={'text'}
                      field={{
                        value: state.name,
                        onChange: ({ target: { value } }) => setValue('name', value),
                      }}
                    />
                    <div className={'mt-8'} />
                    <InputRow
                      label={intl.formatMessage({ id: 'report.email' })}
                      type={'text'}
                      field={{
                        value: state.email,
                        onChange: ({ target: { value } }) => setValue('email', value),
                      }}
                    />

                    {error && (
                      <p className={'font-bold mb-4'} style={{ color: 'red' }}>
                        <FormattedMessage id={error} />
                      </p>
                    )}

                    <div className={'flex justify-between'}>
                      <Button onClick={onRequestClose}>
                        <FormattedMessage id={'report.cancel'} />
                      </Button>

                      <Button onClick={submit}>
                        <FormattedMessage id={'report.button'} />
                      </Button>
                    </div>
                  </div>
                )}
              </Loader>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

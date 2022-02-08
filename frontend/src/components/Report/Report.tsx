import { Button } from 'components/Button';
import InputRow from 'components/InputRow';
import TextareaRow from 'components/TextareaRow';
import Popup from 'components/Popup';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'react-loader';

import { SelectableDropdown } from 'components/pages/search/components/FilterBar/SelectableDropdown';
import useReport from 'components/Report/useReport';
import { Option } from '../../modules/filters/interface';
import { PointGeometry } from '../../modules/interface';

interface Props {
  trekId: number;
  startPoint: PointGeometry;
  onRequestClose: () => void;
}

const Report: React.FC<Props> = ({ trekId, startPoint, onRequestClose }) => {
  const { state, isLoading, options, setValue, submitted, submit, error } = useReport({
    trekId,
    startPoint,
  });
  const intl = useIntl();

  return (
    <Popup onClose={onRequestClose}>
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
              setFilterSelectedOptions={(selectedOptions: Option[]) => {
                setValue('activity', selectedOptions);
              }}
              filterType={'SINGLE'}
            />
            <div className={'mt-8'} />
            <SelectableDropdown
              name={'Category'}
              placeholder={'report.category'}
              options={options.category}
              selectedFilters={state.category}
              setFilterSelectedOptions={(selectedOptions: Option[]) => {
                setValue('category', selectedOptions);
              }}
              filterType={'SINGLE'}
            />
            <div className={'mt-8'} />
            <SelectableDropdown
              name={'Magnitude'}
              placeholder={'report.magnitude'}
              options={options.magnitude}
              selectedFilters={state.magnitude}
              setFilterSelectedOptions={(selectedOptions: Option[]) => {
                setValue('magnitude', selectedOptions);
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
                <FormattedMessage id={'actions.cancel'} />
              </Button>

              <Button onClick={submit}>
                <FormattedMessage id={'report.button'} />
              </Button>
            </div>
          </div>
        )}
      </Loader>
    </Popup>
  );
};

export default Report;

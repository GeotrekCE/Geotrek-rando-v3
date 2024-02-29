import { Button } from 'components/Button';
import InputRow from 'components/InputRow';
import SelectRow from 'components/SelectRow';
import TextareaRow from 'components/TextareaRow';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'components/Loader';

import useReport from 'components/Report/useReport';
import { useMediaPredicate } from 'react-media-hook';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { Arrow } from 'components/Icons/Arrow';
import { getFooterConfig } from 'components/Footer/useFooter';
import HCaptcha from 'components/HCaptcha';
import { Option } from '../../modules/filters/interface';
import { PointGeometry } from '../../modules/interface';
import { MapReportButton } from './MapReportButton';
import CoordinatesRow from './CoordinatesRow';

interface Props {
  displayMobileMap?: () => void;
  setMapId?: (str: string) => void;
  trekId: number;
  startPoint: PointGeometry;
}

const Report: React.FC<Props> = ({ displayMobileMap, setMapId, startPoint, trekId }) => {
  const {
    state,
    coordinatesReportTouched,
    isLoading,
    options,
    setValue,
    submitted,
    submit,
    error,
    handleBlurEvent,
  } = useReport({
    startPoint,
  });

  const { contact: { name, number = '', mail } = {} } = getFooterConfig();

  const { reportVisibility, setReportVisibility } = useDetailsAndMapContext();
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  useEffect(() => {
    if (reportVisibility) {
      setDisplayForm(true);
    }
  }, [reportVisibility]);

  const intl = useIntl();
  const isMobile = useMediaPredicate('(max-width: 1024px)');

  const handleReportButtonClick = () => {
    setMapId?.('default');
    if (isMobile) {
      displayMobileMap?.();
      setReportVisibility(true);
    } else {
      setDisplayForm(boolean => !boolean);
      setReportVisibility(boolean => !boolean);
    }
  };

  return (
    <>
      <div className="flex gap-5 items-center mb-5">
        <p className="text-lg">
          <FormattedMessage id={'report.intro'} />
        </p>
        {!isMobile && (
          <MapReportButton className="mr-1" onClick={handleReportButtonClick}>
            <FormattedMessage id={'report.button'} />
            <Arrow className={`${displayForm ? '-' : ''}rotate-90`} size={24} />
          </MapReportButton>
        )}
      </div>
      {(isMobile || displayForm) && (
        <Loader loaded={!isLoading}>
          {submitted ? (
            <div className="text-lg bg-easyOK p-4 text-white rounded-lg">
              <FormattedMessage id={'report.success'} />
            </div>
          ) : (
            <form encType="multipart/form-data" onSubmit={event => void submit(event)} noValidate>
              {error.message !== null && (
                <p className="font-bold mb-4 text-hardKO">
                  <FormattedMessage id={error.message} />
                </p>
              )}

              {(!isMobile || coordinatesReportTouched) && (
                <CoordinatesRow
                  coordinates={[
                    {
                      label: 'Longitude',
                      value: state.geom?.coordinates.x.toString(),
                    },
                    {
                      label: 'Latitude',
                      value: state.geom?.coordinates.y.toString(),
                    },
                  ]}
                  helpText={intl.messages['report.mapButton.create']}
                />
              )}
              {isMobile && (
                <MapReportButton onClick={handleReportButtonClick}>
                  <FormattedMessage
                    id={
                      coordinatesReportTouched ? 'report.mapButton.edit' : 'report.mapButton.create'
                    }
                  />
                </MapReportButton>
              )}
              {(!isMobile || coordinatesReportTouched) && (
                <>
                  <div className="mt-8">
                    <SelectRow
                      label={intl.formatMessage({ id: 'report.activity' })}
                      field={{
                        name: 'activity',
                        options: options.activity,
                        selectedFilters: state.activity,
                        setFilterSelectedOptions: (selectedOptions: Option[]) => {
                          setValue('activity', selectedOptions);
                        },
                        filterType: 'SINGLE',
                        closeMenuOnSelect: true,
                        placeholder: 'form.selectPlaceholder',
                        required: true,
                        onBlur: () =>
                          handleBlurEvent({
                            target: { name: 'activity', value: state.activity[0]?.value ?? '' },
                          }),
                      }}
                      error={
                        error.fields.includes('activity') === true
                          ? intl.formatMessage({ id: 'form.missingField' })
                          : null
                      }
                    />
                  </div>
                  <div className="mt-8">
                    <SelectRow
                      label={intl.formatMessage({ id: 'report.category' })}
                      field={{
                        name: 'category',
                        options: options.category,
                        selectedFilters: state.category,
                        setFilterSelectedOptions: (selectedOptions: Option[]) => {
                          setValue('category', selectedOptions);
                        },
                        filterType: 'SINGLE',
                        closeMenuOnSelect: true,
                        placeholder: 'form.selectPlaceholder',
                        required: true,
                        onBlur: () =>
                          handleBlurEvent({
                            target: { name: 'category', value: state.category[0]?.value ?? '' },
                          }),
                      }}
                      error={
                        error.fields.includes('category') === true
                          ? intl.formatMessage({ id: 'form.missingField' })
                          : null
                      }
                    />
                  </div>
                  <div className="mt-8">
                    <SelectRow
                      label={intl.formatMessage({ id: 'report.magnitude' })}
                      field={{
                        name: 'problem_magnitude',
                        options: options.magnitude,
                        selectedFilters: state.magnitude,
                        setFilterSelectedOptions: (selectedOptions: Option[]) => {
                          setValue('magnitude', selectedOptions);
                        },
                        filterType: 'SINGLE',
                        closeMenuOnSelect: true,
                        placeholder: 'form.selectPlaceholder',
                        required: true,
                        onBlur: () =>
                          handleBlurEvent({
                            target: { name: 'magnitude', value: state.magnitude[0]?.value ?? '' },
                          }),
                      }}
                      error={
                        error.fields.includes('magnitude') === true
                          ? intl.formatMessage({ id: 'form.missingField' })
                          : null
                      }
                    />
                  </div>
                  <div className="mt-8">
                    <TextareaRow
                      label={intl.formatMessage({ id: 'report.comment' })}
                      field={{
                        name: 'comment',
                      }}
                    />
                  </div>
                  <InputRow
                    label={intl.formatMessage({ id: 'report.email' })}
                    field={{
                      name: 'email',
                      required: true,
                      type: 'email',
                      onBlur: handleBlurEvent,
                    }}
                    error={
                      error.fields.includes('email') === true
                        ? intl.formatMessage({ id: 'form.missingField' })
                        : null
                    }
                  />

                  <div className="desktop:flex gap-2">
                    {Array.from({ length: 3 }, (_, index) => (
                      <InputRow
                        key={index}
                        label={`${intl.formatMessage({ id: 'report.image' })} ${index + 1}`}
                        field={{
                          accept: 'image/*',
                          name: `file${index + 1}`,
                          type: 'file',
                        }}
                      />
                    ))}
                  </div>

                  <input type="hidden" name="related_trek" value={trekId} />

                  <p className="text-sm text-italic">
                    <FormattedMessage
                      id={'report.GDPRDisclaimer'}
                      values={{
                        b: () => <strong className="font-bold">{name}</strong>,
                        a: () => (
                          <a
                            className="underline"
                            href={mail !== undefined ? `mailto:${mail}` : `tel:${number}`}
                          >
                            {mail ?? number}
                          </a>
                        ),
                      }}
                    />
                  </p>

                  <div className="desktop:flex items-center justify-end mt-4 gap-6">
                    <HCaptcha />

                    <Button type="submit">
                      <FormattedMessage id={'report.button'} />
                    </Button>
                  </div>
                </>
              )}
            </form>
          )}
        </Loader>
      )}
    </>
  );
};

export default Report;

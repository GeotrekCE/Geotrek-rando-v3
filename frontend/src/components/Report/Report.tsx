import { Button } from 'components/Button';
import InputRow from 'components/InputRow';
import TextareaRow from 'components/TextareaRow';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Loader from 'react-loader';

import { SelectableDropdown } from 'components/pages/search/components/FilterBar/SelectableDropdown';
import useReport from 'components/Report/useReport';
import { useMediaPredicate } from 'react-media-hook';
import styled from 'styled-components';
import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { Arrow } from 'components/Icons/Arrow';
import { getFooterConfig } from 'components/Footer/useFooter';
import { Option } from '../../modules/filters/interface';
import { PointGeometry } from '../../modules/interface';
import { MapReportButton } from './MapReportButton';
import CoordinatesRow from './CoordinatesRow';

interface Props {
  displayMobileMap?: () => void;
  trekId: number;
  startPoint: PointGeometry;
}

const Report: React.FC<Props> = ({ displayMobileMap, startPoint, trekId }) => {
  const {
    state,
    coordinatesReportTouched,
    isLoading,
    options,
    setValue,
    submitted,
    submit,
    error,
  } = useReport({
    startPoint,
  });

  const { contact: { name, number, mail } = {} } = getFooterConfig();

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
    if (isMobile) {
      displayMobileMap?.();
      setReportVisibility(true);
    } else {
      setDisplayForm(boolean => !boolean);
      setReportVisibility(boolean => !boolean);
    }
  };

  return (
    <ReportWrapper>
      <div className="flex gap-5 items-center mb-5">
        <p className="text-lg">
          <FormattedMessage id={'report.intro'} />
        </p>
        {!isMobile && (
          <MapReportButton className="mr-1" onClick={handleReportButtonClick}>
            <FormattedMessage id={'report.button'} />
            <Arrow className={`transform ${displayForm ? '-' : ''}rotate-90`} size={24} />
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
            <form encType="multipart/form-data" onSubmit={submit}>
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
                    <SelectableDropdown
                      name="activity"
                      placeholder={'report.activity'}
                      options={options.activity}
                      selectedFilters={state.activity}
                      setFilterSelectedOptions={(selectedOptions: Option[]) => {
                        setValue('activity', selectedOptions);
                      }}
                      filterType={'SINGLE'}
                      closeMenuOnSelect
                    />
                  </div>
                  <div className="mt-8">
                    <SelectableDropdown
                      name="category"
                      placeholder={'report.category'}
                      options={options.category}
                      selectedFilters={state.category}
                      setFilterSelectedOptions={(selectedOptions: Option[]) => {
                        setValue('category', selectedOptions);
                      }}
                      filterType={'SINGLE'}
                      closeMenuOnSelect
                    />
                  </div>
                  <div className="mt-8">
                    <SelectableDropdown
                      name="problem_magnitude"
                      placeholder={'report.magnitude'}
                      options={options.magnitude}
                      selectedFilters={state.magnitude}
                      setFilterSelectedOptions={(selectedOptions: Option[]) => {
                        setValue('magnitude', selectedOptions);
                      }}
                      filterType={'SINGLE'}
                      closeMenuOnSelect
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
                    type="text"
                    field={{
                      name: 'email',
                    }}
                  />

                  <div className="desktop:flex gap-2">
                    {Array.from({ length: 3 }, (_, index) => (
                      <InputRow
                        key={index}
                        label={`${intl.formatMessage({ id: 'report.image' })} ${index + 1}`}
                        type="file"
                        field={{
                          accept: 'image/*',
                          name: `file${index + 1}`,
                        }}
                      />
                    ))}
                  </div>

                  <input type="hidden" name="related_trek" value={trekId} />

                  {error !== null && (
                    <p className="font-bold mb-4 text-red">
                      <FormattedMessage
                        id={error.id}
                        values={{
                          field: <FormattedMessage id={error.values.field} />,
                        }}
                      />
                    </p>
                  )}

                  <div className="flex items-center gap-6">
                    <p className="text-sm text-italic">
                      <FormattedMessage
                        id={'report.GDPRDisclaimer'}
                        values={{
                          b: () => <strong className="font-bold">{name}</strong>,
                          a: () => (
                            <a
                              className="underline"
                              href={mail !== undefined ? `mailto:${mail}` : `tel:${number ?? ''}`}
                            >
                              {mail ?? number}
                            </a>
                          ),
                        }}
                      />
                    </p>

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
    </ReportWrapper>
  );
};

const ReportWrapper = styled.div`
  position: relative;
  z-index: 0;
  > .loader {
    min-height: 80px;
  }
`;

export default Report;

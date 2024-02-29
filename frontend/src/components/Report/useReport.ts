import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';

import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { useIntl } from 'react-intl';
import { Option } from '../../modules/filters/interface';
import { PointGeometry } from '../../modules/interface';

import { getFeedbackActivity } from '../../modules/feedbackActivity/connector';
import { getFeedbackCategory } from '../../modules/feedbackCategory/connector';
import { getFeedbackMagnitude } from '../../modules/feedbackMagnitude/connector';
import { getDefaultLanguage } from '../../modules/header/utills';
import { createReport, getFormErrors } from '../../modules/report/connector';

interface PropsState {
  activity: Option[];
  category: Option[];
  magnitude: Option[];
  geom: PointGeometry | null;
}

interface ConvertedOption {
  id: number;
  label: string;
}

interface Error {
  message: string | null;
  fields: string[];
}

const initialState: PropsState = {
  geom: null,
  activity: [],
  category: [],
  magnitude: [],
};

const getFormattedOptions = (data?: ConvertedOption[]): Option[] | [] => {
  if (data === undefined) {
    return [];
  }
  return data.map(({ label, id }) => ({
    label,
    value: String(id),
  }));
};

interface Props {
  startPoint: PointGeometry;
}

const useReport = ({ startPoint }: Props) => {
  const [state, setState] = useState(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<Error>({ message: null, fields: [] });

  const language = useRouter().locale ?? getDefaultLanguage();
  const { messages } = useIntl();

  const {
    coordinatesReport,
    coordinatesReportTouched,
    setCoordinatesReport,
    setCoordinatesReportTouched,
  } = useDetailsAndMapContext();

  useEffect(() => {
    setCoordinatesReportTouched(false);
  }, [setCoordinatesReportTouched]);

  useEffect(() => {
    setCoordinatesReport(prevCoordinates => {
      if (prevCoordinates === null) {
        return startPoint;
      }
      return prevCoordinates;
    });
  }, [setCoordinatesReport, startPoint]);

  useEffect(() => {
    if (coordinatesReport) {
      setValue('geom', coordinatesReport);
    }
  }, [coordinatesReport]);

  const results = useQueries({
    queries: [
      {
        queryKey: ['feedbackActivity', language],
        queryFn: () => getFeedbackActivity(language),
      },
      {
        queryKey: ['feedbackCategory', language],
        queryFn: () => getFeedbackCategory(language),
      },
      {
        queryKey: ['feedbackMagnitude', language],
        queryFn: () => getFeedbackMagnitude(language),
      },
    ],
  });

  const isLoading = results.some(i => i.isLoading);

  const options = {
    activity: getFormattedOptions(results[0].data),
    category: getFormattedOptions(results[1].data),
    magnitude: getFormattedOptions(results[2].data),
  };

  const setValue = (key: string, value: string | PointGeometry | Option[]) => {
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const scrollIntoView = () => {
    document.querySelector('#details_report')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleBlurEvent = (event: { target: { name: string; value: string } }) => {
    const { name: fieldName, value: fieldValue } = event.target;
    setError(prevError => {
      return {
        ...prevError,
        fields:
          fieldValue !== ''
            ? prevError.fields.filter(item => item !== fieldName)
            : [...prevError.fields, fieldName],
      };
    });
  };

  const submit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (state.geom !== null) {
      formData.set(
        'geom',
        `{"type": "Point", "coordinates": [${state.geom.coordinates.x}, ${state.geom.coordinates.y}]}`,
      );
    }
    const formErrors = getFormErrors(formData);
    if (formErrors) {
      setError(formErrors);
      scrollIntoView();
      return;
    }
    await createReport(language, formData)
      .then(async res => {
        const json = await res.json();
        if (res.status < 200 || res.status > 299) {
          const errors = [messages['search.anErrorOccured'], ...Object.values(json as FormData)]
            .map(err => (Array.isArray(err) ? err[0] : err))
            .join('. ');

          setError({
            message: errors,
            fields: [],
          });
          throw new Error(errors);
        } else return json;
      })
      .then(() => {
        setError({ message: null, fields: [] });
        setSubmitted(true);
        scrollIntoView();
      })
      .catch(errorServer => {
        console.error(errorServer);
        setError({ message: errorServer.message, fields: [] });
        scrollIntoView();
      });
    setCoordinatesReportTouched(false);
  };

  return {
    state,
    coordinatesReportTouched,
    isLoading,
    options,
    setValue,
    submit,
    submitted,
    error,
    handleBlurEvent,
  };
};

export default useReport;

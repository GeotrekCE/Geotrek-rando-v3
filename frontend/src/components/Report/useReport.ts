import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQueries } from 'react-query';

import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
import { useIntl } from 'react-intl';
import { Option } from '../../modules/filters/interface';
import { PointGeometry } from '../../modules/interface';

import { getFeedbackActivity } from '../../modules/feedbackActivity/connector';
import { getFeedbackCategory } from '../../modules/feedbackCategory/connector';
import { getFeedbackMagnitude } from '../../modules/feedbackMagnitude/connector';
import { getDefaultLanguage } from '../../modules/header/utills';
import { createReport } from '../../modules/report/connector';

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
  id: string;
  values: {
    field: string;
  };
}

const initialState: PropsState = {
  geom: null,
  activity: [],
  category: [],
  magnitude: [],
};

const getFormattedOptions = (data: unknown | undefined): Option[] | [] => {
  if (data === undefined) {
    return [];
  }
  return (data as ConvertedOption[]).map(({ label, id }) => ({
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
  const [error, setError] = useState<Error | null>(null);

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

  const results = useQueries([
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
  ]);

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

  const submit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (state.geom !== null) {
      formData.set(
        'geom',
        `{"type": "Point", "coordinates": [${state.geom.coordinates.x}, ${state.geom.coordinates.y}]}`,
      );
    }
    await createReport(language, formData)
      .then(async res => {
        const json = await res.json();
        if (res.status < 200 || res.status > 299) {
          const errors = [messages['search.anErrorOccured'], ...Object.values(json)]
            .map(err => (Array.isArray(err) ? err[0] : err))
            .join('. ');

          throw new Error(errors);
        } else return json;
      })
      .then(() => {
        setError(null);
        setSubmitted(true);
        document.querySelector('#details_report')?.scrollIntoView({
          behavior: 'smooth',
        });
      })
      .catch(localError => {
        console.error(localError);
        const [context, key, field] = (localError.message as string).split('.');
        setError({ id: `${context}.${key}`, values: { field: `${context}.${field}` } });
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
  };
};

export default useReport;

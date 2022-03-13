import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQueries } from 'react-query';

import { useDetailsAndMapContext } from 'components/pages/details/DetailsAndMapContext';
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

const initialState: PropsState = {
  geom: null,
  activity: [],
  category: [],
  magnitude: [],
};

const initialOptions = {
  activity: [],
  category: [],
  magnitude: [],
};

interface Props {
  startPoint: PointGeometry;
}

const useReport = ({ startPoint }: Props) => {
  const [state, setState] = useState(initialState);
  const [options, setOptions] = useState(initialOptions);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const language = useRouter().locale ?? getDefaultLanguage();

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
      onSuccess: data => convertToOptions('activity', data as ConvertedOption[]),
    },
    {
      queryKey: ['feedbackCategory', language],
      queryFn: () => getFeedbackCategory(language),
      onSuccess: data => convertToOptions('category', data as ConvertedOption[]),
    },
    {
      queryKey: ['feedbackMagnitude', language],
      queryFn: () => getFeedbackMagnitude(language),
      onSuccess: data => convertToOptions('magnitude', data as ConvertedOption[]),
    },
  ]);

  const isLoading = results.some(i => i.isLoading);

  const convertToOptions = (key: string, data: ConvertedOption[]) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: data.map(({ label, id }) => ({
        label,
        value: String(id),
      })),
    }));
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
        if (res.status === 400) {
          const errors = Object.values(json)
            // @ts-ignore
            .map(v => v[0])
            .join('. ');

          throw new Error(errors);
        } else return json;
      })
      .then(() => {
        setError('');
        setSubmitted(true);
      })
      .catch(localError => {
        console.error(localError);
        setError(localError.message);
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

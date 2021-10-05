import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQueries } from 'react-query';

import { Option } from 'modules/filters/interface';
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
  geom: PointGeometry;
  comment: string;
  email: string;
  name: string;
}

const initialState: PropsState = {
  comment: '',
  email: '',
  name: '',
  geom: { type: 'Point', coordinates: { x: 0, y: 0 } },
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
  trekId: number;
  startPoint: PointGeometry;
}

const useReport = ({ trekId, startPoint }: Props) => {
  const [state, setState] = useState(initialState);
  const [options, setOptions] = useState(initialOptions);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const language = useRouter().locale ?? getDefaultLanguage();

  useEffect(() => {
    // On définit un point par défaut en attendant de faire le developpement nécessaire pour choisir l'emplacement du problème
    setValue('geom', startPoint);
  }, []);

  const results = useQueries([
    {
      queryKey: ['feedbackActivity', language],
      queryFn: () => getFeedbackActivity(language),
      onSuccess: data => convertToOptions('activity', data),
    },
    {
      queryKey: ['feedbackCategory', language],
      queryFn: () => getFeedbackCategory(language),
      onSuccess: data => convertToOptions('category', data),
    },
    {
      queryKey: ['feedbackMagnitude', language],
      queryFn: () => getFeedbackMagnitude(language),
      onSuccess: data => convertToOptions('magnitude', data),
    },
  ]);

  const isLoading = results.some(i => i.isLoading);

  const convertToOptions = (key: string, data: any) => {
    setOptions(oldOptions => {
      const newOptions = JSON.parse(JSON.stringify(oldOptions));
      newOptions[key] = data.map((d: any) => ({
        label: d.label,
        value: String(d.id),
      }));
      return newOptions;
    });
  };

  const setValue = (key: string, value: any) => {
    setState(oldState => {
      const newState = JSON.parse(JSON.stringify(oldState));
      newState[key] = value;
      return newState;
    });
  };

  const submit = async () => {
    await createReport(language, {
      activity: Number(state.activity[0].value),
      category: Number(state.category[0].value),
      problem_magnitude: Number(state.magnitude[0].value),
      email: state.email,
      name: state.name,
      comment: state.comment,
      geom: `{"type": "Point", "coordinates": [${state.geom.coordinates.x}, ${state.geom.coordinates.y}]}`,
      related_trek: trekId,
    })
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
      .then(res => {
        setError('');
        setSubmitted(true);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  };

  return { state, isLoading, options, setValue, submit, submitted, error };
};

export default useReport;

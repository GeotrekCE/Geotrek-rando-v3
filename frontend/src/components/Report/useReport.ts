import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueries } from 'react-query';

import { getFeedbackActivity } from '../../modules/feedbackActivity/connector';
import { getFeedbackCategory } from '../../modules/feedbackCategory/connector';
import { getFeedbackMagnitude } from '../../modules/feedbackMagnitude/connector';
import { getDefaultLanguage } from '../../modules/header/utills';
import { createReport } from '../../modules/report/connector';

const initialState = {
  comment: '',
  email: '',
  name: '',
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
}

const useReport = ({ trekId }: Props) => {
  const [state, setState] = useState(initialState);
  const [options, setOptions] = useState(initialOptions);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const language = useRouter().locale ?? getDefaultLanguage();

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
      newOptions[key] = data;
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
    return createReport(language, {
      activity: state.activity[0],
      category: state.category[0],
      problem_magnitude: state.magnitude[0],
      email: state.email,
      name: state.name,
      comment: state.comment,
      related_trek: trekId,
    })
      .then(() => {
        setError('');
        setSubmitted(true);
      })
      .catch(error => setError(error.message));
  };

  return { state, isLoading, options, setValue, submit, submitted, error };
};

export default useReport;

import { adaptTouristicEventDetails, adaptTouristicEvents } from './adapter';
import { fetchTouristicEventDetails, fetchTouristicEvents } from './api';
import { TouristicEvent, TouristicEventDetails } from './interface';

export const getTouristicEvents = async (
  language: string,
  query = {},
): Promise<TouristicEvent[]> => {
  const [rawTouristicEventResult] = await Promise.all([
    fetchTouristicEvents({ ...query, language }),
  ]);

  return adaptTouristicEvents({
    rawTouristicEvents: rawTouristicEventResult.results,
  });
};

export const getTouristicEventDetails = async (
  id: string,
  language: string,
): Promise<TouristicEventDetails> => {
  try {
    const [rawTouristicEventDetails] = await Promise.all([
      fetchTouristicEventDetails({ language }, id),
    ]);

    return adaptTouristicEventDetails({
      rawTouristicEventDetails,
    });
  } catch (e) {
    console.error('Error in outdoor course connector', e);
    throw e;
  }
};

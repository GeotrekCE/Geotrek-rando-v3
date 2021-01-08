import wretch from 'wretch';

export const GeotrekAPI = wretch(process.env.REACT_APP_API_BASE_URL);

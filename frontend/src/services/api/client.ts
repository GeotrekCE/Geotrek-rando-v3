import axios from 'axios';

const backendBaseUrl = process.env.REACT_APP_API_BASE_URL ?? '';

export const apiClient = axios.create({
  baseURL: backendBaseUrl,
  headers: {
    'Content-Type': 'application / json',
  },
});

apiClient.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

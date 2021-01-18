import wretch from 'wretch';
import { getApiUrl } from '../envLoader';

export const GeotrekAPI = wretch(getApiUrl());

import { getGlobalConfig } from 'modules/utils/api.config';
import axios from 'axios';
const STALE_CACHE_TIME = 1000 * 60 * 60 * 24;

const cachedRoute: RegExp[] = [
  RegExp(/\/trek_practice/),
  RegExp(/\/city/),
  RegExp(/\/trek_accessibility/),
  RegExp(/\/trek_difficulty/),
  RegExp(/\/district/),
  RegExp(/\/label/),
  RegExp(/\/portal/),
  RegExp(/\/theme/),
  RegExp(/\/touristiccontent_category/),
  RegExp(/\/structure/),
  RegExp(/\/trek_route/),
  RegExp(/\/trek_network/),
  RegExp(/\/poi_type/),
  RegExp(/\/source/),
  RegExp(/\/informationdesk/),
];

const instance = axios.create({
  baseURL: getGlobalConfig().apiUrl,
});

export const GeotrekAPI = instance;

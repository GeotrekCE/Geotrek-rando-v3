import { Offline } from 'modules/offline/interface';
import { ControlSaveTiles } from 'leaflet.offline';
import { Details } from '../../modules/details/interface';
import { OutdoorCourseDetails } from '../../modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from '../../modules/outdoorSite/interface';
import { TouristicContentDetails } from '../../modules/touristicContent/interface';
import { TouristicEventDetails } from '../../modules/touristicEvent/interface';

let controlInstance: any = null;

const PATTER_LOCAL_STORAGE = 'item-';

let storageSize: ControlSaveTiles;

const CacheManager = {
  getTreksCached: (): Offline[] => {
    return Object.keys(localStorage)
      .filter(i => i.includes(PATTER_LOCAL_STORAGE))
      .map(key => JSON.parse(localStorage.getItem(key) ?? '{}'));
  },

  storeItem: async ({
    details,
    url,
    type,
  }: {
    details:
      | Details
      | TouristicContentDetails
      | OutdoorSiteDetails
      | OutdoorCourseDetails
      | TouristicEventDetails;
    type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_EVENT';
    url: string[];
  }) => {
    controlInstance.recenter();

    const cache = await caches.open('trek-pages');

    await Promise.all(url.map(_ => cache.add(_)));

    const title = 'title' in details ? details.title : details.name;

    const images = 'images' in details ? details.images : details.imgs;
    const thumbnailUris = 'thumbnails' in details ? details.thumbnails : images.map(i => i.url);
    const informations =
      'informations' in details ? { ...details.informations, reservationSystem: null } : [];

    let practice = null;
    if ('practice' in details) practice = details.practice;
    else if ('category' in details)
      practice = {
        pictogram: details.category.pictogramUri,
        name: details.category.label,
      };

    const place = 'place' in details ? details.place : '';

    localStorage.setItem(
      `${PATTER_LOCAL_STORAGE}${details.id}`,
      JSON.stringify({
        title,
        type,
        id: details.id,
        place,
        images,
        thumbnailUris,
        informations,
        practice,
      }),
    );

    // eslint-disable-next-line no-underscore-dangle
    if (controlInstance?._saveTiles) await controlInstance._saveTiles();
  },

  registerControlInstance: (control: ControlSaveTiles) => {
    controlInstance = control;
  },

  registerStorageSize: (storage: ControlSaveTiles) => {
    storageSize = storage;
  },

  getStorageSize: () => {
    return storageSize;
  },

  getKey: (id: string): string => `${PATTER_LOCAL_STORAGE}${id}`,

  eraseItem: async (id: string) => {
    // Remove tiles
    const openRequest = indexedDB.open('leaflet.offline', 1);
    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const transaction = db.transaction('tileStore', 'readwrite');
      const store = transaction.objectStore('tileStore');

      const allKeys = store.getAllKeys();

      allKeys.onsuccess = () => {
        allKeys.result
          .filter(key => String(key).includes(`?${id}`))
          .forEach(key => store.delete(key));
      };
    };

    // Remove cached page
    const cache = await caches.open('trek-pages');
    const keys = await cache.keys();
    const results = keys.filter(
      request =>
        request.url.includes(`/trek/${id}`) ||
        request.url.includes(`/service/${id}`) ||
        request.url.includes(`/outdoor-site/${id}`) ||
        request.url.includes(`/outdoor-course/${id}`),
    );
    await Promise.all(results.map(request => cache.delete(request)));

    // Remove in local storage
    Object.keys(localStorage)
      .filter(i => i === CacheManager.getKey(id))
      .forEach(key => localStorage.removeItem(key));
  },

  isInCache: (id: string): boolean => {
    return Object.keys(localStorage).some(key => key === CacheManager.getKey(id));
  },
};

export default CacheManager;

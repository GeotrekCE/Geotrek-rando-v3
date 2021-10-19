import { Details } from '../../modules/details/interface';
import { TouristicContentDetails } from '../../modules/touristicContent/interface';

let controlInstance: any = null;

const PATTER_LOCAL_STORAGE = 'item-';

let storageSize: any;

const CacheManager = {
  getTreksCached: () => {
    return Object.keys(localStorage)
      .filter(i => i.includes(PATTER_LOCAL_STORAGE))
      .map(key => JSON.parse(localStorage.getItem(key) ?? '{}'));
  },

  storeItem: async ({
    details,
    url,
    type,
  }: {
    details: Details | TouristicContentDetails;
    type: 'TREK' | 'TOURISTIC_CONTENT';
    url: string[];
  }) => {
    controlInstance.recenter();

    const cache = await caches.open('trek-pages');

    await Promise.all(url.map(_ => cache.add(_)));

    const title = 'title' in details ? details.title : details.name;
    const thumbnailUris =
      'thumbnailUris' in details ? details.thumbnailUris : details.imgs.map(i => i.url);
    const informations = 'informations' in details ? details.informations : [];

    localStorage.setItem(
      `${PATTER_LOCAL_STORAGE}${details.id}`,
      JSON.stringify({
        description: details.description,
        title,
        type,
        id: details.id,
        place: details.place,
        thumbnailUris,
        informations,
      }),
    );

    // eslint-disable-next-line no-underscore-dangle
    if (controlInstance?._saveTiles) await controlInstance._saveTiles();
  },

  registerControlInstance: (control: any) => {
    controlInstance = control;
  },

  registerStorageSize: (storage: any) => {
    storageSize = storage;
  },

  getStorageSize: (): any => {
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

      const keys = store.getAllKeys();

      keys.onsuccess = () => {
        keys.result.filter(key => String(key).includes(`?${id}`)).forEach(key => store.delete(key));
      };
    };

    // Remove cached page
    const cache = await caches.open('trek-pages');
    const keys = await cache.keys();
    const results = keys.filter(request => request.url.includes(`/trek/${id}`));
    await Promise.all(results.map(request => cache.delete(request)));

    // Remove in local storage
    Object.keys(localStorage)
      .filter(i => i === CacheManager.getKey(id))
      .forEach(key => localStorage.removeItem(key));
  },

  isInCache: (id: string): boolean => {
    return !!Object.keys(localStorage).find(key => key === CacheManager.getKey(id));
  },
};

export default CacheManager;

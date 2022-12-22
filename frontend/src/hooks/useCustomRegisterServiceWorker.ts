import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

declare global {
  interface Window {
    workbox: Workbox;
  }
}

const useCustomRegisterServiceWorker = () => {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
      setIsOnline(window.navigator.onLine);
      if (!window.ononline) {
        window.addEventListener('online', () => {
          setIsOnline(true);
        });
      }
      if (!window.onoffline) {
        window.addEventListener('offline', () => {
          setIsOnline(false);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined &&
      isOnline
    ) {
      const pagesToCache = ['search', 'information'];
      pagesToCache.forEach(page => {
        if (router.route.startsWith(`/${page}`)) {
          const wb = window.workbox;
          void wb.active.then(() => {
            void wb.messageSW({ action: `${page}-pages` });
          });
        }
      });
    }
  }, [isOnline, router.route]);
};

export default useCustomRegisterServiceWorker;

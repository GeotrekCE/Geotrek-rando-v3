import { Router } from 'next/router';
import { useEffect, useState } from 'react';

export const useNavigationLoader = (): {
  isNavigationLoading: boolean;
} => {
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', (url, { shallow }) => {
      if (!shallow) setIsNavigationLoading(true);
    });
    Router.events.on('routeChangeError', e => {
      setIsNavigationLoading(false);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsNavigationLoading(false);
    });
  }, []);

  return {
    isNavigationLoading,
  };
};

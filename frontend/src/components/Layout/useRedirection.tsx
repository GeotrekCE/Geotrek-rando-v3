import { Router } from 'next/router';
import { useState } from 'react';

export const useNavigationLoader = (): {
  isNavigationLoading: boolean;
} => {
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);

  Router.events.on('routeChangeStart', () => setIsNavigationLoading(true));
  Router.events.on('routeChangeError', () => setIsNavigationLoading(false));
  Router.events.on('routeChangeComplete', () => setIsNavigationLoading(false));

  return {
    isNavigationLoading,
  };
};

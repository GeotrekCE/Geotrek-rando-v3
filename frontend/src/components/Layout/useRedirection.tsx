import { Router } from 'next/router';
import { useEffect, useState } from 'react';

export const useNavigationLoader = (): {
  isNavigationLoading: boolean;
} => {
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);

  const handleStart = (url: string, { shallow }: { shallow: boolean }) => {
    if (!shallow) setIsNavigationLoading(true);
  };

  const handleComplete = () => {
    setIsNavigationLoading(false);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeError', handleComplete);
    Router.events.on('routeChangeComplete', handleComplete);
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeError', handleComplete);
      Router.events.off('routeChangeComplete', handleComplete);
    };
  }, []);

  return {
    isNavigationLoading,
  };
};

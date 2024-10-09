import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// Returns “true” if the page is displayed using the browser's "back" or "forward" buttons
const useBrowserNavigationDetection = () => {
  const router = useRouter();
  const isNavigatedByBrowserRef = useRef(false);
  const [isNavigatedByBrowser, setNavigatedByBrowser] = useState(false);

  useEffect(() => {
    router.beforePopState(() => {
      isNavigatedByBrowserRef.current = true;
      return true;
    });

    const handleRouteChangeStart = () => {
      // the router.beforePopState() method is always triggered first
      // so we have to play with ref to wait for “routeChangeStart” to be triggered
      if (isNavigatedByBrowserRef.current) {
        setNavigatedByBrowser(true);
        isNavigatedByBrowserRef.current = false;
      } else {
        setNavigatedByBrowser(false);
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.beforePopState(() => true);
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router]);

  return isNavigatedByBrowser;
};

export default useBrowserNavigationDetection;

// https://nextjs.org/docs/messages/react-hydration-error#possible-ways-to-fix-it

import { useEffect, useState } from 'react';
const useHasMounted = (boolean = true): boolean => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(boolean);
  }, []);

  return domLoaded;
};

export default useHasMounted;

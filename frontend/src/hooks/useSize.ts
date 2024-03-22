import { MutableRefObject, RefObject, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useSize = (target: MutableRefObject<HTMLElement | null | undefined>) => {
  const [size, setSize] = useState<DOMRect | null>(null);

  useIsomorphicLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect() ?? null);
  }, [target]);

  useResizeObserver(target as RefObject<HTMLElement>, entry => setSize(entry.contentRect ?? null));
  return size;
};

export default useSize;

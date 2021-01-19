import React from 'react';

export function useIntersectionObserver<TTargetType extends HTMLElement>({
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: {
  target: React.RefObject<TTargetType>;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}): void {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && onIntersect()),
      {
        rootMargin,
        threshold,
      },
    );

    const el = target?.current;

    if (!el) {
      return;
    } else {
      observer.observe(el);
    }

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
}

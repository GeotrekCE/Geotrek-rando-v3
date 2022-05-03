import { useCallback, useRef, useState } from 'react';
import { DetailsSectionsPosition } from 'components/pages/details/useDetails';
// @ts-ignore
import debounce from 'debounce';
import { getDimensions } from 'components/pages/details/utils';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useSectionsReferences = () => {
  const sectionsReferences = useRef<Record<string, HTMLDivElement | null>>({});
  const [sectionsPositions, setSectionsPositions] = useState<DetailsSectionsPosition>({});

  const useSectionReferenceCallback = (sectionName: string) =>
    useCallback((node: HTMLDivElement | null): void => {
      if (node !== null) {
        sectionsReferences.current[sectionName] = node;
        setSectionsPositions(currentSectionsPositions => ({
          ...currentSectionsPositions,
          [sectionName]: getDimensions(node),
        }));
      }
    }, []);

  const handleResize = useCallback(
    debounce(
      () => {
        setSectionsPositions(currentSectionsPositions => {
          if (sectionsReferences.current === null) {
            return currentSectionsPositions;
          }
          return Object.entries(sectionsReferences.current).reduce(
            (obj, [name, ref]) => ({
              ...obj,
              [name]: getDimensions(ref),
            }),
            {},
          );
        });
      },
      1000,
      false,
    ),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    global.addEventListener('resize', handleResize);
    global.addEventListener('scroll', handleResize);
    return () => {
      global.removeEventListener('resize', handleResize);
      global.removeEventListener('scroll', handleResize);
    };
  }, []);

  return {
    sectionsReferences,
    sectionsPositions,
    setSectionsPositions,
    useSectionReferenceCallback,
  };
};

export default useSectionsReferences;

import { DetailsSectionsPosition } from 'components/pages/details/useDetails';
import { getDimensions } from 'components/pages/details/utils';
import { isUrlString } from 'modules/utils/string';
import { useCallback, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getOutdoorCourseDetails } from '../../../modules/outdoorCourse/connector';
import { OutdoorCourseDetails } from '../../../modules/outdoorCourse/interface';

export const useOutdoorCourse = (
  outdoorCourseUrl: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(outdoorCourseUrl) ? outdoorCourseUrl.split('-')[0] : '';
  const path = isUrlString(outdoorCourseUrl) ? decodeURI(outdoorCourseUrl) : '';
  const { data, refetch, isLoading } = useQuery<OutdoorCourseDetails, Error>(
    ['outdoorCourseDetails', id, language],
    () => getOutdoorCourseDetails(id, language),
    {
      enabled: isUrlString(outdoorCourseUrl),
    },
  );

  const sectionsReferences = useRef<Record<string, HTMLDivElement | null>>({});
  const [sectionsPositions, setSectionsPositions] = useState<DetailsSectionsPosition>({});

  const useSectionReferenceCallback = (sectionName: string) =>
    useCallback((node: HTMLDivElement | null) => {
      if (node !== null) {
        setTimeout(() => {
          sectionsReferences.current[sectionName] = node;
          setSectionsPositions(currentSectionsPositions => ({
            ...currentSectionsPositions,
            [sectionName]: getDimensions(node),
          }));
        }, 1000);
      }
    }, []);

  const setPreviewRef = useSectionReferenceCallback('preview');
  const setPoisRef = useSectionReferenceCallback('poi');
  const setTouristicContentsRef = useSectionReferenceCallback('touristicContent');
  const setSensitiveAreasRef = useSectionReferenceCallback('sensitiveAreasRef');

  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  return {
    id,
    outdoorCourseContent: data,
    refetch,
    isLoading,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    path,
    sectionsReferences,
    sectionsPositions,
    setPreviewRef,
    setPoisRef,
    setTouristicContentsRef,
    setSensitiveAreasRef
  };
};

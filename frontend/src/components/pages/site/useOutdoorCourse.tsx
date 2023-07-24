import useSectionsReferences from 'hooks/useSectionsReferences';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { isRessourceMissing } from 'services/routeUtils';
import { routes } from 'services/routes';
import { ONE_DAY } from 'services/constants/staleTime';
import { DetailsSections } from '../details/useDetails';
import { getDetailsConfig } from '../details/config';
import { OutdoorCourseDetails } from '../../../modules/outdoorCourse/interface';
import { getOutdoorCourseDetails } from '../../../modules/outdoorCourse/connector';

export const useOutdoorCourse = (
  outdoorCourseUrl: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(outdoorCourseUrl) ? outdoorCourseUrl.split('-')[0] : '';
  const path = isUrlString(outdoorCourseUrl) ? decodeURI(outdoorCourseUrl) : '';

  const router = useRouter();

  const { data: commonDictionaries } = useQuery<CommonDictionaries, Error>(
    ['commonDictionaries', language],
    () => getCommonDictionaries(language),
    {
      onError: async error => {
        if (isRessourceMissing(error)) {
          await router.push(routes.HOME);
        }
      },
      staleTime: ONE_DAY / 2,
    },
  );

  const { data, refetch, isLoading } = useQuery<OutdoorCourseDetails, Error>(
    ['outdoorCourseDetails', id, language],
    () => getOutdoorCourseDetails(id, language, commonDictionaries),
    {
      enabled: isUrlString(outdoorCourseUrl) && commonDictionaries !== undefined,
      onError: async error => {
        if (isRessourceMissing(error)) {
          await router.push(routes.HOME);
        }
      },
      staleTime: ONE_DAY,
    },
  );

  const { sections } = getDetailsConfig();

  const sectionsOutdoorCourse = sections.outdoorCourse.filter(({ display }) => display === true);

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const sectionRef = sectionsOutdoorCourse.reduce(
    (list, item) => ({ ...list, [item.name]: useSectionReferenceCallback(item.name) }),
    {} as Record<DetailsSections, (node: HTMLDivElement | null) => void>,
  );

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

    sectionRef,
  };
};

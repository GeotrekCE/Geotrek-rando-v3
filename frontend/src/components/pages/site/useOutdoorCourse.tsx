import useSectionsReferences from 'hooks/useSectionsReferences';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { isRessourceMissing } from 'services/routeUtils';
import { routes } from 'services/routes';
import { ONE_DAY } from 'services/constants/staleTime';
import { useQueryCommonDictionaries } from 'modules/dictionaries/api';
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

  const commonDictionaries = useQueryCommonDictionaries(language);

  const { data, refetch, isLoading } = useQuery<OutdoorCourseDetails, Error>(
    ['outdoorCourseDetails', id, language],
    () => getOutdoorCourseDetails(id, language, commonDictionaries),
    {
      enabled: isUrlString(outdoorCourseUrl) && commonDictionaries !== undefined,
      onError: error => {
        if (isRessourceMissing(error)) {
          void router.push(routes.HOME);
        }
      },
      staleTime: ONE_DAY,
    },
  );

  const { sections } = getDetailsConfig(language);

  const sectionsOutdoorCourse = sections.outdoorCourse.filter(({ display }) => display === true);

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const sectionRef = sectionsOutdoorCourse.reduce(
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

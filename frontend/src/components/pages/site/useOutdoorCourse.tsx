import useSectionsReferences from 'hooks/useSectionsReferences';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOutdoorCourseDetails } from '../../../modules/outdoorCourse/connector';
import { OutdoorCourseDetails } from '../../../modules/outdoorCourse/interface';
import { getDetailsConfig } from '../details/config';
import { DetailsSections } from '../details/useDetails';

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

  const { sections } = getDetailsConfig();

  const sectionsOutdoorCourse = sections.outdoorCourse.filter(
    ({ display, anchor }) => display === true && anchor,
  );

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

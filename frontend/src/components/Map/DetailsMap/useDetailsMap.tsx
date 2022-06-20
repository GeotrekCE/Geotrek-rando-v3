import { useState } from 'react';

export type Visibility = 'DISPLAYED' | 'HIDDEN' | null;

const toggleVisibility = (currentVisibility: Visibility) =>
  currentVisibility === 'DISPLAYED' ? 'HIDDEN' : 'DISPLAYED';

export const useDetailsMap = () => {
  const [trekChildrenMobileVisibility, setTrekChildrenVisibility] = useState<Visibility>('HIDDEN');
  const [poiMobileVisibility, setPoiVisibility] = useState<Visibility>('HIDDEN');
  const [referencePointsMobileVisibility, setReferencePointsVisibility] =
    useState<Visibility>('HIDDEN');
  const [touristicContentMobileVisibility, setTouristicContentVisibility] =
    useState<Visibility>('HIDDEN');

  const [informationDeskMobileVisibility, setInformationDeskVisibility] =
    useState<Visibility>('HIDDEN');

  const [coursesVisibility, setCoursesVisibility] = useState<Visibility>('HIDDEN');
  const [experiencesVisibility, setExperiencesVisibility] = useState<Visibility>('HIDDEN');
  const [signageVisibility, setSignageVisibility] = useState<Visibility>('HIDDEN');
  const [serviceVisibility, setServiceVisibility] = useState<Visibility>('HIDDEN');
  const [infrastructureVisibility, setInfrastructureVisibility] = useState<Visibility>('HIDDEN');

  const toggleTrekChildrenVisibility = () => setTrekChildrenVisibility(toggleVisibility);

  const togglePoiVisibility = () => setPoiVisibility(toggleVisibility);

  const toggleReferencePointsVisibility = () => setReferencePointsVisibility(toggleVisibility);

  const toggleTouristicContentVisibility = () => setTouristicContentVisibility(toggleVisibility);

  const toggleInformationDeskVisibility = () => setInformationDeskVisibility(toggleVisibility);

  const toggleExperiencesVisibility = () => setExperiencesVisibility(toggleVisibility);
  const toggleCoursesVisibility = () => setCoursesVisibility(toggleVisibility);
  const toggleSignageVisibility = () => setSignageVisibility(toggleVisibility);
  const toggleServiceVisibility = () => setServiceVisibility(toggleVisibility);
  const toggleInfrastructureVisibility = () => setInfrastructureVisibility(toggleVisibility);

  return {
    trekChildrenMobileVisibility,
    toggleTrekChildrenVisibility,
    poiMobileVisibility,
    togglePoiVisibility,
    referencePointsMobileVisibility,
    informationDeskMobileVisibility,
    toggleReferencePointsVisibility,
    touristicContentMobileVisibility,
    toggleTouristicContentVisibility,
    toggleInformationDeskVisibility,
    coursesVisibility,
    toggleCoursesVisibility,
    experiencesVisibility,
    toggleExperiencesVisibility,
    signageVisibility,
    toggleSignageVisibility,
    serviceVisibility,
    toggleServiceVisibility,
    infrastructureVisibility,
    toggleInfrastructureVisibility,
  };
};

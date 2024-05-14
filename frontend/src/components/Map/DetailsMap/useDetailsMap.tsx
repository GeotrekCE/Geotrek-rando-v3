import { useState } from 'react';
import { getMapConfig } from '../config';

export type Visibility = 'DISPLAYED' | 'HIDDEN' | null;

const toggleVisibility = (currentVisibility: Visibility) =>
  currentVisibility === 'DISPLAYED' ? 'HIDDEN' : 'DISPLAYED';

export const useDetailsMap = () => {
  const { displaySecondaryLayersByDefault } = getMapConfig();
  const displaySecondaryLayers = displaySecondaryLayersByDefault ? 'DISPLAYED' : 'HIDDEN';

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
  const [signageVisibility, setSignageVisibility] = useState<Visibility>(displaySecondaryLayers);
  const [serviceVisibility, setServiceVisibility] = useState<Visibility>(displaySecondaryLayers);
  const [infrastructureVisibility, setInfrastructureVisibility] =
    useState<Visibility>(displaySecondaryLayers);
  const [viewPointVisibility, setViewPointVisibility] = useState<Visibility>('HIDDEN');
  const [annotationViewpointVisibility, setAnnotationViewpointVisibility] =
    useState<Visibility>('DISPLAYED');

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
  const toggleViewPointVisibility = () => setViewPointVisibility(toggleVisibility);
  const toggleAnnotationViewpointVisibility = () =>
    setAnnotationViewpointVisibility(toggleVisibility);

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
    viewPointVisibility,
    toggleViewPointVisibility,
    annotationViewpointVisibility,
    toggleAnnotationViewpointVisibility,
  };
};

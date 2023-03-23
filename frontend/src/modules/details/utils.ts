import getNextConfig from 'next/config';

const {
  publicRuntimeConfig: {
    global: {
      displayObjectsRelatedToItinerantTreks: {
        POIs = true,
        touristicContents = true,
        sensitiveAreas = true,
        infrastructures = true,
        signages = true,
        services = true,
      } = {},
    },
  },
} = getNextConfig();

export const getObjectsRelatedToItinerantTreksToDisplay = (childrenIds: number[]) => {
  // The limitation concerns Itinerant treks
  if (childrenIds === null || childrenIds === undefined || childrenIds.length === 0) {
    return {
      displayRelatedPOIs: true,
      displayRelatedTouristicContents: true,
      displayRelatedSensitiveAreas: true,
      displayRelatedInfrastructures: true,
      displayRelatedSignages: true,
      displayRelatedServices: true,
    };
  }
  return {
    displayRelatedPOIs: POIs,
    displayRelatedTouristicContents: touristicContents,
    displayRelatedSensitiveAreas: sensitiveAreas,
    displayRelatedInfrastructures: infrastructures,
    displayRelatedSignages: signages,
    displayRelatedServices: services,
  };
};

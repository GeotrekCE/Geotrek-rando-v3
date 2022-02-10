import getConfig from 'next/config';

const getActivityColor = (type?: string): string => {
  const {
    publicRuntimeConfig: { colors },
  } = getConfig();
  const color = type
    ? {
        TREK: colors?.categories?.trek || '#001B84',
        OUTDOOR_SITE: colors?.categories?.events || '#E69736',
        OUTDOOR_COURSE: colors?.categories?.events || '#E69736',
        TOURISTIC_CONTENT: colors?.categories?.outdoor || '#3B89A2',
        TOURISTIC_EVENT: colors?.categories?.service || '#62AB41',
        practices: colors?.categories?.trek || '#001B84',
        outdoorPractice: colors?.categories?.events || '#E69736',
        categories: colors?.categories?.service || '#3B89A2',
        event: colors?.categories?.service || '#62AB41',
      }[type]
    : '#AA397D';

  return color;
};

export default getActivityColor;

import getConfig from 'next/config';
import { colorPalette } from 'stylesheet';
import getNextConfig from 'next/config';

const default_trek_color = '#001B84';
const default_outdoor_color = '#E69736';
const default_touristic_event_color = '#62AB41';
const default_touristic_content_color = '#3B89A2';

const {
  publicRuntimeConfig: { style, colors },
} = getNextConfig();

const getActivityColor = (type?: string | null): string => {
  const {
    publicRuntimeConfig: { colors },
  } = getConfig();

  const defaultColor = colors.primary1?.DEFAULT || '#AA397D';

  const color =
    (type
      ? {
          TREK: colors?.categories?.trek || default_trek_color,
          OUTDOOR_SITE: colors?.categories?.outdoor || default_outdoor_color,
          OUTDOOR_COURSE: colors?.categories?.outdoor || default_outdoor_color,
          TOURISTIC_CONTENT: colors?.categories?.service || default_touristic_content_color,
          TOURISTIC_EVENT: colors?.categories?.events || default_touristic_event_color,
          POI: colors?.categories?.outdoor || default_outdoor_color,
          practices: colors?.categories?.trek || default_trek_color,
          outdoorPractice: colors?.categories?.outdoor || default_outdoor_color,
          event: colors?.categories?.events || default_touristic_event_color,
          categories: colors?.categories?.service || default_touristic_content_color,
        }[type]
      : defaultColor) ?? defaultColor;

  return color;
};

export default getActivityColor;

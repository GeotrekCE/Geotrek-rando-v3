import getConfig from 'next/config';

const default_trek_color = '#001B84';
const default_outdoor_color = '#E69736';
const default_touristic_event_color = '#62AB41';
const default_touristic_content_color = '#3B89A2';

const getActivityColor = (type?: string | null): string => {
  const {
    publicRuntimeConfig: {
      colors,
      global: { groupTreksAndOutdoorFilters },
    },
  } = getConfig();

  const defaultColor = colors.primary1?.DEFAULT || '#AA397D';

  const outdoorColor =
    groupTreksAndOutdoorFilters === true
      ? colors?.categories?.trek || default_trek_color
      : colors?.categories?.outdoor || default_outdoor_color;

  const color =
    (type
      ? {
          TREK: colors?.categories?.trek || default_trek_color,
          OUTDOOR_SITE: outdoorColor,
          OUTDOOR_COURSE: outdoorColor,
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


// TODO standardize `type` prop
const getStandardizedType = (type: string | null) => {
  switch (type) {
    case 'TREK':
    case 'PRACTICE':
    case 'practices':
      return 'TREK';

    case 'OUTDOOR_SITE':
    case 'OUTDOOR_PRACTICE':
    case 'outdoorPractice':
      return 'OUTDOOR_SITE';

    case 'TOURISTIC_CONTENT':
    case 'CATEGORY':
    case 'categories':
      return 'TOURISTIC_CONTENT';

    case 'TOURISTIC_EVENT':
    case 'TOURISTIC_EVENT_TYPE':
    case 'event':
      return 'TOURISTIC_EVENT';

    default:
      return 'default';
  }
};

export const getActivityColorClassName = (
  rawType: string | null,
  {
    withColor,
    withColorHover,
    withBackground,
    withBackgroundHover,
  }: {
    withColor?: boolean;
    withColorHover?: boolean;
    withBackground?: boolean;
    withBackgroundHover?: boolean;
  },
): string => {
  const classes = [];
  const type = getStandardizedType(rawType);
  switch (type) {
    case 'TREK':
      if (withColor) classes.push('text-trek');
      if (withBackground) classes.push('bg-trek');
      if (withColorHover) classes.push('hover:text-trek focus:text-trek');
      if (withBackgroundHover) classes.push('hover:bg-trek focus:bg-trek');
      break;

    case 'OUTDOOR_SITE':
      if (withColor) classes.push('text-outdoor');
      if (withBackground) classes.push('bg-outdoor');
      if (withColorHover) classes.push('hover:text-outdoor focus:text-outdoor');
      if (withBackgroundHover) classes.push('hover:bg-outdoor focus:bg-outdoor');
      break;

    case 'TOURISTIC_CONTENT':
      if (withColor) classes.push('text-service');
      if (withBackground) classes.push('bg-service');
      if (withColorHover) classes.push('hover:text-service focus:text-service');
      if (withBackgroundHover) classes.push('hover:bg-service focus:bg-service');
      break;

    case 'TOURISTIC_EVENT':
      if (withColor) classes.push('text-events');
      if (withBackground) classes.push('bg-events');
      if (withColorHover) classes.push('hover:text-events focus:text-events');
      if (withBackgroundHover) classes.push('hover:bg-events focus:bg-events');
      break;

    default:
      if (withColor) classes.push('text-primary1');
      if (withBackground) classes.push('bg-primary1');
      if (withColorHover) classes.push('hover:text-primary1 focus:text-primary1');
      if (withBackgroundHover) classes.push('hover:bg-primary1 focus:bg-primary1');
  }
  return classes.join(' ');
};
export default getActivityColor;

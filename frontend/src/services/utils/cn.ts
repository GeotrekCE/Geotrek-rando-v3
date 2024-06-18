import { extendTailwindMerge, twJoin } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge';
import { theme } from '../../../tailwind.config';

const { fontSize } = theme.extend;

// ExtendTailwindMerge to avoid removing ambiguous classNames
// For example font-size `text-H4` and color `text-primary1`
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': Object.keys(fontSize).map(fontSizeKey => `text-${fontSizeKey}`),
    },
  },
});

// twMerge conditionally add Tailwind CSS classes
// twJoin concats the className attributes
export const cn = (...inputs: ClassNameValue[]) => {
  return twMerge(twJoin(inputs));
};

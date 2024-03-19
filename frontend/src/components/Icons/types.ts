import { SVGProps } from 'react';

export interface GenericIconProps extends SVGProps<SVGSVGElement> {
  /** Default value is "currentColor", which allows you
   * to color your icon using the CSS `color` property. It is the recommended way. */
  color?: string;
  size?: number;
}

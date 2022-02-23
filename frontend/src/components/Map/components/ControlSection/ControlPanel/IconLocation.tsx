import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12.007 1.152c-3.744 0-6.778 2.978-6.778 6.65 0 3.673 6.778 15.718 6.778 15.718s6.779-12.045 6.779-15.718c0-3.672-3.036-6.65-6.779-6.65Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgComponent;

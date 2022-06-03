import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 2.667C8.636 2.667 2.667 8.637 2.667 16c0 7.364 5.97 13.333 13.333 13.333 7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.333-13.333-13.333Z"
      fill="currentColor"
    />
    <path
      d="M16 21.333 21.333 16 16 10.667M10.667 16h10.666"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;

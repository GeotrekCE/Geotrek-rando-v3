/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_API_BASE_URL: string;
  }
}
declare module 'react-country-flag' {
  import * as React from 'react';
  export interface ReactCountryFlagProps {
    countryCode: string;
    cdnSuffix?: string;
    cdnUrl?: string;
    svg?: boolean;
    style?: React.CSSProperties;
    className?: string;
  }
  export default class ReactCountryFlag extends React.Component<ReactCountryFlagProps> {}
}

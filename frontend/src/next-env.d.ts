/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_API_BASE_URL: string;
  }
}

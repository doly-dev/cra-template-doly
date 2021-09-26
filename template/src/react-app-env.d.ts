/// <reference types="react-scripts" />

declare module '*.less';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_ENV: 'dev' | 'test' | 'prod';
    readonly REACT_APP_API: string;
    readonly MOCK?: string;
  }
}
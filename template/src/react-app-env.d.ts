/// <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_ENV: 'dev' | 'test' | 'prod';
    readonly REACT_APP_API: string;
    readonly REACT_APP_MOCK?: string;
  }
}

import type { ResponseConstructor } from './common';

declare global {
  namespace API {
    type Login = ResponseConstructor<{
      username: string;
      mobile: string;
      token: string;
    }>;
  }
}

export { };

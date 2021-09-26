import type { ResponseDataConstructor } from './common';

declare global {
  namespace API {
    type Login = ResponseDataConstructor<{
      username: string;
      mobile: string;
      token: string;
    }>;
  }
}

export { }
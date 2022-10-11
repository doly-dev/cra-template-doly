import { ResponseData } from './common';

declare global {
  namespace API {
    type Login = ResponseData<{
      data: {
        username: string;
        mobile: string;
        token: string;
      }
    }>;
  }
}

export { };

import { session } from './storage';

const TOKEN_KEY = 'loginToken'; // 登录token

export const getToken = () => session.get(TOKEN_KEY) as string | undefined;
export const setToken = (token: string) => {
  session.set(TOKEN_KEY, token);
};
export const removeToken = () => {
  session.remove(TOKEN_KEY);
};

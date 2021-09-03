import { session } from './storage';

const tokenKey = 'loginTokenName'; // 登录token

export const getToken = () => session.get(tokenKey);
export const setToken = (data: any) => session.set(tokenKey, data);
export const removeToken = () => session.remove(tokenKey);

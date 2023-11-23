import { Cache } from 'cache2';

// 本地存储命名空间，建议改为项目名
const STORE_NAMESPACE = 'cra-template-doly';
const cache = new Cache(STORE_NAMESPACE, {
  storage: window.sessionStorage
});

// 登录信息
const LOGIN_INFO_KEY = 'loginInfo';

export const getLoginInfo = () => cache.get(LOGIN_INFO_KEY) as (API.Login['data'] | undefined);
export const setLoginInfo = (data: API.Login['data']) => {
  cache.set(LOGIN_INFO_KEY, data);
};
export const removeLoginInfo = () => {
  cache.del(LOGIN_INFO_KEY);
};

import { LoginDataType } from '@/services/types/login';
import { Cache, Storage } from 'cache2';

// 本地存储命名空间，建议改为项目名
const STORE_NAMESPACE = 'vite-template-doly';
export const sessionCache = new Cache(STORE_NAMESPACE, {
  storage: window.sessionStorage
});
export const localCache = new Cache(STORE_NAMESPACE, {
  storage: window.localStorage
});

// 相同域名下的单页应用，使用前缀区分不同应用的缓存
const prefix = STORE_NAMESPACE + '_';
export const memoryCache = new Cache(STORE_NAMESPACE, { prefix });
export const session = new Storage(window.sessionStorage, { prefix });
export const local = new Storage(window.localStorage, { prefix });

// 登录信息
const LOGIN_INFO_KEY = 'loginInfo';
export const getLoginInfo = () => sessionCache.get(LOGIN_INFO_KEY) as LoginDataType | undefined;
export const setLoginInfo = (data: LoginDataType) => {
  sessionCache.set(LOGIN_INFO_KEY, data);
};
export const removeLoginInfo = () => {
  sessionCache.del(LOGIN_INFO_KEY);
};

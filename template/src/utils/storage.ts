import store from 'store2';

// 本地存储命名空间，建议改为项目名
const STORE_NAMESPACE = 'cra-template-doly';
const { session } = store.namespace(STORE_NAMESPACE);

// 登录信息
const LOGIN_INFO_KEY = 'loginInfo';

export const getLoginInfo = () => session.get(LOGIN_INFO_KEY) as (API.Login['data'] | undefined);
export const setLoginInfo = (data: API.Login['data']) => {
  session.set(LOGIN_INFO_KEY, data);
};
export const removeLoginInfo = () => {
  session.remove(LOGIN_INFO_KEY);
};

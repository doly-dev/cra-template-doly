import store from 'store2';

type StoraNameSpaceType = store.StoreAPI & { session: store.StoreAPI };

const { session } = store.namespace('cra-template-doly') as StoraNameSpaceType; // 改为项目名

const tokenKey = 'loginTokenName'; // 登录token

export const getToken = () => session.get(tokenKey);
export const setToken = (data: any) => session.set(tokenKey, data);
export const removeToken = () => session.remove(tokenKey);

export const clearAll = () => session.clearAll();

export default session;

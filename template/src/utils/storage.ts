import store from 'store2';

type StoraNameSpaceType = store.StoreAPI & { session: store.StoreAPI; local: store.StoreAPI };
export const { session, local } = store.namespace('app-static-hms-patient') as StoraNameSpaceType; // 改为项目名

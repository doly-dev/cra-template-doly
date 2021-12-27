import store from 'store2';

// 本地存储命名空间，建议改为项目名
const STORE_NAMESPACE = 'cra-template-doly';

export const { session, local } = store.namespace(STORE_NAMESPACE);

import store from 'store2';

type StoreNameSpaceType = store.StoreAPI & { session: store.StoreAPI; local: store.StoreAPI };

const STORE_NAMESPACE = 'cra-template-doly'; // 改为项目名

export const { session, local } = store.namespace(STORE_NAMESPACE) as StoreNameSpaceType;

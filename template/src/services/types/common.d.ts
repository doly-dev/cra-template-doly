// 数据响应结构
export type ResponseConstructor<D = any> = {
  errCode: string;
  errMsg: string;
  data: D;
};

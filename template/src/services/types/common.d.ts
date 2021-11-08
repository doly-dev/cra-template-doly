// 数据响应结构
export type ResponseDataConstructor<D = any> = {
  errCode: string;
  errMsg: string;
  data: D;
};

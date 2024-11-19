// 响应结构
export type TResponse<T extends object = object> = {
  errCode: string; // 响应码
  errMsg: string; // 响应信息
} & T;

// 响应数据
export type TResponseData<T = any> = TResponse<{
  data: T;
}>;

// 响应分页数据
export type TResponsePageData<T extends object> = TResponseData<{
  pageData: T[]; // 对象列表
  curPage: number; // 页码
  pageSize: number; // 每页记录数
  total: number; // 总记录数
}>;

// 分页参数
export type TParamsPage<T extends object> = {
  pageNum: number; //	页码
  pageSize: number; // 每页的记录数
} & T;

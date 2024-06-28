// 响应数据
export type ResponseData<T extends Record<string, any> = object> = {
  errCode: string; // 响应码
  errMsg: string; // 响应信息
} & T;

// 响应分页数据
export type ResponsePageData<T extends Record<string, any> = object> = ResponseData<{
  data: {
    pageData: T[]; // 对象列表
    curPage: number; // 页码
    pageSize: number; // 每页记录数
    total: number; // 总记录数
  };
}>;

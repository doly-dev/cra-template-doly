// 数据响应结构
type ResponseDataConstructor<D = any> = {
  errCode: string;
  errMsg: string;
  data: D;
}

type RepoItem = {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
}

declare namespace API {
  type Login = ResponseDataConstructor<{
    username: string;
    mobile: string;
    token: string;
  }>

  type ReposList = RepoItem[];
  type ReposDetail = RepoItem;
}

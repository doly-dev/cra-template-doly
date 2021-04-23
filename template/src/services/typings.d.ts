
type RepoItem = {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
}

declare namespace API {
  type Login = {
    username: string;
    mobile: string;
    token: string;
  }

  type ReposList = RepoItem[];
  type ReposDetail = RepoItem;
}

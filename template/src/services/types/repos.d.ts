type RepoItem = {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
};

declare global {
  namespace API {
    type ReposList = RepoItem[];
    type ReposDetail = RepoItem;
  }
}

export { };

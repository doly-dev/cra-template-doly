import { ResponseData } from './common';

export type RepoItem = {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
};

declare global {
  namespace API {
    type ReposList = ResponseData<{ data: RepoItem[] }>;
    type ReposDetail = ResponseData<{ data: RepoItem }>;
  }
}

export {};

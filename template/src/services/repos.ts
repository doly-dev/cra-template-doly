import request from '@/utils/request';

export async function getReposList() {
  // https://api.github.com/users/doly-dev/repos
  return request<API.ReposList>('/users/doly-dev/repos', {
    method: 'GET'
  });
}

export async function getReposByName(name: string) {
  // https://api.github.com/repos/doly-dev/${name}
  return request<API.ReposDetail>(`/repos/doly-dev/${name}`, {
    method: 'GET'
  });
}

import request from '@/utils/request';

export async function getReposList() {
  return request<API.ReposList>('/users/doly-dev/repos', {
    // return request('https://api.github.com/users/doly-dev/repos', {
    method: 'GET'
  });
}

export async function getReposByName(name: string) {
  return request<API.ReposDetail>(`/repos/doly-dev/${name}`, {
    // return request(`https://api.github.com/repos/doly-dev/${name}`, {
    method: 'GET'
  });
}

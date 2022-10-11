import request from '@/utils/request';

// 获取仓库列表
export function getReposList() {
  return request<API.ReposList>('/users/doly-dev/repos', {
    method: 'GET'
  });
}

// 获取仓库详情
export function getReposByName(name: string) {
  return request<API.ReposDetail>(`/repos/doly-dev/${name}`, {
    method: 'GET'
  });
}

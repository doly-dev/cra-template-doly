import request from '@/utils/request';
import { ResponseData } from './types/common';
import { RepoItem } from './types/repos';

// 获取仓库列表
export function getReposList() {
  return request<ResponseData<RepoItem[]>>('/users/doly-dev/repos', {
    method: 'GET'
  });
}

// 获取仓库详情
export function getReposByName(name: string) {
  return request<ResponseData<RepoItem>>(`/repos/doly-dev/${name}`, {
    method: 'GET'
  });
}

import request from '@/utils/request';
import { TResponseData } from './types/common';
import { TRepoItem } from './types/repos';

/**获取仓库列表 */
export function getReposList() {
  return request<TResponseData<TRepoItem[]>>('/users/doly-dev/repos', {
    method: 'GET'
  });
}

/**获取仓库详情 */
export function getReposByName(name: string) {
  return request<TResponseData<TRepoItem>>(`/repos/doly-dev/${name}`, {
    method: 'GET'
  });
}

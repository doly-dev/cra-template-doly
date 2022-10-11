import request from '@/utils/request';

// 登录
export function login(data: {
  username: string;
  password: string;
}) {
  return request<API.Login>('/api/login', { data }, false);
}

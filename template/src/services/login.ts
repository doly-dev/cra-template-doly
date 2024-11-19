import request from '@/utils/request';
import { TResponseData } from './types/common';
import { TLoginData } from './types/login';

// 登录
export function login(data: { username: string; password: string }) {
  return request<TResponseData<TLoginData>>('/api/login', { data, token: false });
}

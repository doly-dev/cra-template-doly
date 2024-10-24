import request from '@/utils/request';
import { ResponseData } from './types/common';
import { LoginDataType } from './types/login';

// 登录
export function login(data: { username: string; password: string }) {
  return request<ResponseData<LoginDataType>>('/api/login', { data, token: false });
}

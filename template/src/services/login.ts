import request from '@/utils/request';

export async function login() {
  return request<API.Login>('/api/login', { headersToken: false });
}

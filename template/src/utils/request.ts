import axios, { AxiosRequestConfig } from 'axios';
import { getLoginInfo } from './storage';

const HEADER_TOKEN_NAME = 'Authorization'; // 请求头token名称

interface RequestOptions<D = any> extends Omit<AxiosRequestConfig<D>, 'url' | 'headers'> {
  headers?: Record<string, any>;
}

/**
 * 可在该模块编写部分业务逻辑，如请求头token，请求失败/登录过期/服务错误等处理
 * axios 文档：https://github.com/axios/axios#request-config
 */
function request<T = any>(url: string, options?: RequestOptions, token = false): Promise<T> {
  const defaultHeaders = token ? { [HEADER_TOKEN_NAME]: getLoginInfo()?.token } : {};

  return axios({
    url,
    baseURL: process.env.REACT_APP_API, // 环境变量在 config/env.ts 设置
    method: 'POST',
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers
    }
  })
    .then((res) => {
      // 请求成功处理，一般会有其他逻辑处理。如登录过期、特殊响应码等
      const data = res.data || {};

      if (data.errCode !== '0000') {
        return Promise.reject(data);
      }

      return data;
    })
    .catch((err) => {
      // 请求失败处理，一般是全局错误提示

      return Promise.reject(err);
    });
}

export default request;

import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { getToken } from '@/utils/storage';

const HEADER_TOKEN_NAME = 'Authorization'; // 请求头token名称

interface RequestOptions extends Omit<AxiosRequestConfig, 'url'> {
  headersToken?: boolean; // 请求头是否添加登录token
}

/**
 * 可在该模块编写部分业务逻辑，如请求头token，请求失败/登录过期/服务错误等处理
 * axios 文档：https://github.com/axios/axios#request-config
 */
function request<T = any>(url: AxiosRequestConfig['url'], options?: RequestOptions): Promise<T> {
  const { headersToken = true, ...restOptions } = options || {};

  const headers = {
    ...(headersToken
      ? {
        [HEADER_TOKEN_NAME]: getToken(),
      } : {}),
    ...restOptions.headers,
  };

  return axios({
    url,
    baseURL: process.env.REACT_APP_API, // REACT_APP_API 通过环境变量设置
    method: 'POST',
    ...restOptions,
    headers,
  })
    .then((res) => {
      // 请求成功处理，一般会有其他逻辑处理。如登录过期、特殊responseCode等

      return res.data;
    })
    .catch((err) => {
      // 请求失败处理，一般是全局错误提示

      return Promise.reject(err);
    });
}

export default request;

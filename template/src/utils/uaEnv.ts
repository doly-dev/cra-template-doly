import { isBrowser } from 'ut2';

const ua = isBrowser && typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';

const is = (agent: string) => {
  return ua.indexOf(agent.toLowerCase()) > -1;
};

const os = (function () {
  if (/windows/.test(ua)) {
    return 'windows';
  } else if (/linux/.test(ua)) {
    return 'linux';
  } else if (/iphone|ipod|ipad|ios/.test(ua)) {
    return 'ios';
  } else if (/mac/.test(ua)) {
    return 'mac';
  }
})();

const android = /android/.test(ua);
const ios = os === 'ios';
const mobile = android || ios;
const ie = isBrowser && (!!(window as any).ActiveXObject || 'ActiveXObject' in window);
const weixin = /micromessenger/.test(ua);

/**
 * @description 运行环境变量
 */
const uaEnv = {
  /**
   * 判断是否在某个运行环境。
   *
   * @param agent 运行环境标识
   * @returns
   * @example
   * // 支付宝环境
   * env.is('aliapp');
   */
  is,

  // 系统
  /**
   * 底层操作系统
   */
  os,
  /**
   * 是否运行在安卓系统
   */
  android,
  /**
   * 是否运行在iOS系统
   */
  ios,
  /**
   * 是否运行在安卓或iOS系统
   */
  mobile,

  // 浏览器
  /**
   * 是否运行在ie浏览器
   */
  ie,
  /**
   * 是否运行在微信浏览器
   */
  weixin
} as const;

export default uaEnv;

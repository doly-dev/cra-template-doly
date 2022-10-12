import { Request, Response } from 'express';
import { waitTime } from 'util-helpers';
import Mockjs from 'mockjs';
import 'mockjs-extend';

// 模拟接口延迟时间
const DELAY_TIME = 1000;

// 响应数据基础结构
const ResponseBasicConstructor = {
  errCode: '0000',  // 响应码 0000-成功
  errMsg: 'mock success', // 响应信息
}

// 参数类型
type MockParam = Record<string, any> | ((req: Request, res: Response) => Promise<Record<string, any>>);

// 模拟数据
export const mockData = (data: MockParam = {}) => {
  return async (req: Request, res: Response) => {
    await waitTime(DELAY_TIME);

    let realData = data;
    if (typeof data === 'function') {
      realData = await data(req, res);
      if (!realData) {
        return;
      }
    }

    const result = Mockjs.mock({
      ...ResponseBasicConstructor,
      ...realData
    });
    res.send(result);
  }
}

// 模拟分页数据
export const mockPageData = (pageData: Record<string, any> = {}) => {
  return mockData({
    data: {
      'pageData|10': [pageData], // 对象列表
      curPage: 1, //  页码
      pageSize: 10, //  每页记录数
      'total|11-150': 20, //  总记录数
    }
  });
}

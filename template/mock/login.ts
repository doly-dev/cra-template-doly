import { mockData } from './utils';

export default {
  'POST /api/login': mockData({
    data: {
      username: '@cname',
      mobile: '@mobile',
      token: '@guid'
    }
  })
};

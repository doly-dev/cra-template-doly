const mockUtil = require('./utils');

module.exports = {
  'POST /api/login': mockUtil.mockData({
    data: {
      username: '@cname',
      mobile: '@mobile',
      token: '@guid'
    }
  })
};

const { mockData } = require('./utils');

module.exports = {
  'POST /api/login': mockData({
    data: {
      username: '@cname',
      mobile: '@mobile',
      token: '@guid'
    }
  })
};

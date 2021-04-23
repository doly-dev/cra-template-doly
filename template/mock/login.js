const delay = require('mocker-api/lib/delay');

module.exports = delay({
  'POST /api/login': {
    errMsg: 'mock success',
    errCode: '0000',
    data: {
      username: '张三',
      mobile: '13333333333',
      token: '1q21qa233'
    }
  }
}, 1000);
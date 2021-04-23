// 环境对应 .env-cmprc 中配置的 REACT_APP_ENV
module.exports = {
  dev: {
    '/api': {
      target: 'https://example.com',
      changeOrigin: true,
      // secure: false,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
      target: 'your test url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  }
}
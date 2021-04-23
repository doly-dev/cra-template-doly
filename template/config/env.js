// 环境变量配置
module.exports = {
  default: {
    PUBLIC_URL: "/",
    REACT_APP_API: ""
  },
  dev: {
    REACT_APP_ENV: "dev"
  },
  test: {
    PUBLIC_URL: "http://test.example.com/path/",
    REACT_APP_API: "http://api.example.com",
    REACT_APP_ENV: "test"
  },
  prod: {
    PUBLIC_URL: "http://example.com/path/",
    REACT_APP_API: "http://api.example.com",
    REACT_APP_ENV: "prod",
    GENERATE_SOURCEMAP: "false",
    BUILD_PATH: "dist"
  }
}
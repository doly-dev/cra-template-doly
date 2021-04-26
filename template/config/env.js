// 环境变量配置
module.exports = {
  default: {
    PUBLIC_URL: "",
    REACT_APP_API: ""
  },
  dev: {
    // PUBLIC_URL: "http://dev.example.com/path",
    // REACT_APP_API: "http://dev.api.example.com",
    REACT_APP_ENV: "dev"
  },
  test: {
    // PUBLIC_URL: "http://test.example.com/path",
    // REACT_APP_API: "http://test.api.example.com",
    REACT_APP_ENV: "test"
  },
  prod: {
    // PUBLIC_URL: "http://example.com/path",
    // REACT_APP_API: "http://prod.api.example.com",
    REACT_APP_ENV: "prod",
    GENERATE_SOURCEMAP: "false",
    BUILD_PATH: "dist"
  }
}
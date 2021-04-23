const path = require('path');
const glob = require('glob');
const apiMocker = require('mocker-api');
const CracoLessPlugin = require("craco-less");
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { whenProd } = require('@craco/craco');
const proxy = require('./proxy');
const theme = require('./theme');

const cwd = process.cwd();
const { REACT_APP_ENV, MOCK } = process.env;

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(cwd, 'src')
    },
    configure: (webpackConfig) => {
      // ref: https://github.com/facebook/create-react-app/issues/5372#issuecomment-727103057
      const instanceOfMiniCssExtractPlugin = webpackConfig.plugins.find(
        (plugin) => plugin instanceof MiniCssExtractPlugin,
      );
      if (instanceOfMiniCssExtractPlugin) {
        instanceOfMiniCssExtractPlugin.options.ignoreOrder = true;
      }

      return {
        ...webpackConfig,
        optimization: {
          ...webpackConfig.optimization,
          // ref: https://github.com/facebook/create-react-app/issues/5372#issuecomment-678892998
          splitChunks: { // 将多入口的公共部分单独打包
            minChunks: 2,
            cacheGroups: {
              vendor: {
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                reuseExistingChunk: true
              },
              default: false
            }
          },
          minimizer: webpackConfig.optimization.minimizer.map(item => {
            if (item && item.options && item.options.extractComments) {
              item.options.extractComments = false;
            }
            return item;
          })
        },
      }
    },
    plugins: {
      add: [...whenProd(() => [new WebpackBar()], [])]
    }
  },
  devServer: (devServerConfig, { env }) => {
    console.log(MOCK, env);
    if (MOCK !== 'none' && env !== 'production') {
      devServerConfig.before = (app) => {
        apiMocker(app, glob.sync(path.resolve(cwd, 'mock/*.js')))
      }
    }
    if (env !== 'production') {
      devServerConfig.proxy = proxy[REACT_APP_ENV] || {};
    }
    return devServerConfig;
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme || {},
            javascriptEnabled: true,
          },
        },
        miniCssExtractPluginOptions: {
          ignoreOrder: true
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme || {},
            javascriptEnabled: true,
          },
        },
        miniCssExtractPluginOptions: {
          ignoreOrder: true
        },
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.module\.less$/;
          lessRule.exclude = undefined;
          return lessRule;
        },
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
      }
    }
  ],
  babel: {
    plugins: [
      ['import', { libraryName: 'antd-mobile', style: true }]
    ]
  }
}

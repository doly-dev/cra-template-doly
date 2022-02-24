const path = require('path');
const glob = require('glob');
const express = require('express');
const apiMocker = require('mocker-api');
const CracoLessPlugin = require('craco-less');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { whenProd, whenDev } = require('@craco/craco');
const proxy = require('./proxy');

const cwd = process.cwd();
const { REACT_APP_ENV, REACT_APP_MOCK } = process.env;

// compatibility mini-css-extract-plugin v2.5.0
// ref: https://github.com/webpack-contrib/mini-css-extract-plugin/releases/tag/v2.5.0
const MiniCssExtractPluginClass =
  typeof MiniCssExtractPlugin === 'function' ? MiniCssExtractPlugin : MiniCssExtractPlugin.default;

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(cwd, 'src')
    },
    configure: (webpackConfig) => {
      // ref: https://github.com/facebook/create-react-app/issues/5372#issuecomment-727103057
      const instanceOfMiniCssExtractPlugin = webpackConfig.plugins.find(
        (plugin) => plugin instanceof MiniCssExtractPluginClass
      );
      if (instanceOfMiniCssExtractPlugin) {
        instanceOfMiniCssExtractPlugin.options.ignoreOrder = true;
      }

      return {
        ...webpackConfig,
        // 开发环境下不显示 stats 打印信息
        // ref: https://github.com/webpack/webpack-dev-middleware/blob/master/src/utils/setupHooks.js#L179
        ...whenDev(() => ({ stats: 'none' }), {}),
        optimization: {
          ...webpackConfig.optimization,
          // ref: https://github.com/facebook/create-react-app/issues/5372#issuecomment-678892998
          splitChunks: {
            ...webpackConfig.optimization?.splitChunks,
            // 将公共部分单独打包
            // 目前都使用 Tree-sharking 没有必要单独处理 node_modules（工具已单独处理 react 等部分单独提取）
            cacheGroups: {
              ...webpackConfig.optimization?.splitChunks?.cacheGroups,
              common: {
                minChunks: 2,
                name: 'common',
                chunks: 'all',
                minSize: 100
              },
              default: false
            }
          },
          minimizer: webpackConfig.optimization?.minimizer.map((item) => {
            if (item && item.options && item.options.extractComments) {
              item.options.extractComments = false;
            }
            return item;
          })
        }
      };
    },
    plugins: {
      add: [...whenProd(() => [new WebpackBar()], [])]
    }
  },
  devServer: (devServerConfig, { env }) => {
    if (REACT_APP_MOCK !== 'none' && env !== 'production') {
      devServerConfig.setupMiddlewares = (middlewares, devServer) => {
        // ref: https://stackoverflow.com/questions/50304779/payloadtoolargeerror-request-entity-too-large
        devServer.app.use(express.json({ limit: '50mb' }));
        devServer.app.use(
          express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
        );

        apiMocker(devServer.app, glob.sync(path.resolve(cwd, 'mock/*.js')));
        return middlewares;
      };
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
            // modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: {},
            javascriptEnabled: true
          }
        },
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.module\.less$/;
          lessRule.exclude = undefined;
          return lessRule;
        },
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' }
        }
      }
    }
  ],
  babel: {
    plugins: [...whenProd(() => [['transform-remove-console', { exclude: ['error', 'warn'] }]], [])]
  }
};

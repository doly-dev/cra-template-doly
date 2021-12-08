const path = require('path');
const glob = require('glob');
const express = require('express');
const apiMocker = require('mocker-api');
const CracoLessPlugin = require('craco-less');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { whenProd } = require('@craco/craco');
const proxy = require('./proxy');

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
        (plugin) => plugin instanceof MiniCssExtractPlugin
      );
      if (instanceOfMiniCssExtractPlugin) {
        instanceOfMiniCssExtractPlugin.options.ignoreOrder = true;
      }

      return {
        ...webpackConfig,
        optimization: {
          ...webpackConfig.optimization,
          // ref: https://github.com/facebook/create-react-app/issues/5372#issuecomment-678892998
          splitChunks: {
            minChunks: 2,
            // 将公共部分单独打包
            cacheGroups: {
              common: {
                name: 'common',
                chunks: 'all',
                minSize: 100
              },
              default: false
            }
          },
          minimizer: webpackConfig.optimization.minimizer.map((item) => {
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
    if (MOCK !== 'none' && env !== 'production') {
      devServerConfig.before = (app) => {
        // ref: https://stackoverflow.com/questions/50304779/payloadtoolargeerror-request-entity-too-large
        app.use(express.json({ limit: '50mb' }));
        app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

        apiMocker(app, glob.sync(path.resolve(cwd, 'mock/*.js')));
      };
    }
    if (env !== 'production') {
      devServerConfig.proxy = proxy[REACT_APP_ENV] || {};
    }
    // ref: https://github.com/facebook/create-react-app/issues/9937#issuecomment-919315580
    devServerConfig.publicPath = '/';
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
        },
        miniCssExtractPluginOptions: {
          ignoreOrder: true
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
        miniCssExtractPluginOptions: {
          ignoreOrder: true
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
    plugins: [
      ...whenProd(() => [['transform-remove-console', { exclude: ['error', 'warn'] }]], [])
    ]
  }
};

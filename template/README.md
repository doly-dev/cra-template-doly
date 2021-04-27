# cra-template-doly

## 使用须知

在实际项目中，切记一定要修改 `public` 下的文件，`favicon.ico`、`index.html`、`logo.png`、`mainfest.json` 。

还有根据项目需求修改 `config/env.js`、`config/zip.js`、`config/proxy.js.js` 等配置。

## 开发

在项目目录中，你可以运行:

### `yarn start`

在开发模式下运行应用程序。

默认设置 `config/env.js` 的 `default` 环境变量。

其他开发模式脚本：

- `yarn start:no-mock` - 不启用 mock 运行
- `yarn start:dev` - 设置 `config/env.js` 的 `default` 和 `dev` 环境变量，并且不启用 mock 运行
- `yarn start:test` - 设置 `config/env.js` 的 `default` 和 `test` 环境变量，并且不启用 mock 运行

你也可以自定义其他开发模式的脚本。

### `yarn build`

将应用程序构建到 `dist` 文件夹。

默认设置 `config/env.js` 的 `default` 和 `prod` 环境变量。

### `yarn zip`

> 请在 `config/zip.js` 对构建结果的打包进行配置。

将构建结果 `dist` 目录下的文件，打包到 `zip/{package.name}-{package.version}.zip` 中，默认忽略 `.DS_Store` 文件。

## 目录结构

```
.
├── config
│   ├── env.js               # 环境变量配置
│   ├── config.js            # craco 配置文件
│   ├── proxy.js             # 代理配置，对应环境变量 REACT_APP_ENV
│   ├── theme.js             # 主题配置
│   ├── zip.js               # zip 包配置
├── dist                     # 构建结果
├── zip                      # 打包构建结果的文件
├── mock                     # mock 数据
├── public
│   ├── favicon.ico          # favicon
│   ├── index.html           # html
│   ├── logo.png             # logo
│   ├── manifest.json        # 用来告知浏览器关于 PWA 应用信息
├── src
│   ├── assets               # 静态资源，如图片、样式、字体等
│   ├── components           # 组件
│   ├── models               # 状态管理
│   ├── pages                # 页面
│   ├── services             # 后台接口服务
│   ├── utils                # 工具
│   ├── App.tsx              # 应用路由、布局、全局上下文（如果是复杂点的应用可以将路由和布局单独拆分到新文件夹 layouts 中）
│   ├── App.less             # 应用样式
│   ├── Index.tsx            # 项目入口文件
│   ├── Index.less           # 全局样式
├── package.json
├── README.md
```

## 第三方库推荐

- 状态管理
  - [mobx]
  - [mobx-state-tree]
  - [hox]
  - [redux]
- 浏览器兼容
  - [Supported Browsers and Features]
  - [react-app-polyfill]
- 移动端调试控制台工具
  - [vConsole]
  - [eruda]
- mock 数据
  - [mockjs]
- 路由 + 页面切换动画
  - [@wonder-ui/router]
  - [react-router-transition]
- 动画效果
  - [react-transition-group]
  - [react-motion]
  - [react-spring]

## 常见问题

### 如何配置 antd 或 antd-mobile 主题？

直接修改 `config/theme.js` 配置即可。

参考：

- [antd-mobile 定制主题]
- [antd 定制主题]

### 如果不使用 antd-mobile，需要删除哪些文件？

首先，需确认页面中没有使用到 antd-mobile 组件。

然后在 `config/config.js` 中删除以下配置：

```typescript
babel: {
  plugins: [['import', { libraryName: 'antd-mobile', style: true }]];
}
```

最后卸载依赖：

```bash
yarn remove antd-mobile
```

### 如何使用 antd？

安装依赖

```bash
yarn add antd
```

在 `config/config.js` 中添加配置：

```typescript
babel: {
  plugins: [['import', { libraryName: 'antd', style: true }]];
}
```

这样就可以了。

**注意：如果第一个页面中没有使用到任何 antd 组件，可能导致没有加载 antd 默认样式。这种情况下，推荐引入 antd 全部样式，或在第一个页面中随便引入一个 antd 组件再隐藏该组件即可。**

### 环境变量配置相关问题？

建议阅读以下几篇文章：

- [Adding Custom Environment Variables]
- [Advanced Configuration]
- [env-cmd]

### mock 有什么好处？

> 配置参考 [mocker-api]，推荐使用 [mockjs]

mock 数据可以让前端不依赖服务接口的情况下进行开发，可自行伪造边界数据，极大提升本地开发效率和质量。

### 怎么分析构建包大小？

`config/env.js` 将生产环境配置的 `GENERATE_SOURCEMAP` 注释

```javascript
// GENERATE_SOURCEMAP: "false",
```

然后重新构建

```bash
yarn build
```

最后运行分析脚本

```bash
yarn analyze
```

[adding custom environment variables]: https://create-react-app.dev/docs/adding-custom-environment-variables
[supported browsers and features]: https://create-react-app.dev/docs/supported-browsers-features/#supported-language-features
[code splitting in create react app]: https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
[adding a css modules stylesheet]: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
[advanced configuration]: https://create-react-app.dev/docs/advanced-configuration
[react-app-polyfill]: https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
[ant-design]: https://ant-design.gitee.io/
[antd 定制主题]: https://ant-design.gitee.io/docs/react/customize-theme-cn
[antd-mobile 定制主题]: https://mobile.ant.design/docs/react/customize-theme-cn
[vconsole]: https://github.com/Tencent/vConsole
[eruda]: https://github.com/liriliri/eruda
[mocker-api]: https://github.com/jaywcjlove/mocker-api
[mockjs]: https://github.com/nuysoft/Mock/wiki
[env-cmd]: https://github.com/toddbluhm/env-cmd
[babel-plugin-import]: https://github.com/ant-design/babel-plugin-import
[hox]: https://github.com/umijs/hox
[mobx]: https://github.com/mobxjs/mobx
[mobx-state-tree]: https://github.com/mobxjs/mobx-state-tree
[redux]: https://github.com/reduxjs/redux
[@wonder-ui/router]: https://www.npmjs.com/package/@wonder-ui/router
[react-router-transition]: http://maisano.github.io/react-router-transition/
[react-transition-group]: https://reactcommunity.org/react-transition-group/
[react-motion]: https://github.com/chenglou/react-motion
[react-spring]: https://github.com/react-spring/react-spring

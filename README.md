# cra-template-doly

[![npm][npm]][npm-url] ![GitHub](https://img.shields.io/github/license/doly-dev/cra-template-doly.svg)

基于 [Create React App](https://create-react-app.dev/) + [craco](https://github.com/gsoft-inc/craco) 扩展的脚手架，快速构建 React 单页应用。

了解更多信息，[请点击查阅文档](https://doly-dev.github.io/cra-template-doly-site/latest/)。

## 使用

```shell
npx create-react-app my-app --template doly

# or

yarn create react-app my-app --template doly
```

然后，为了支持 `husky` `lint-staged` `eslint` `prettier` `commitlint` 首先运行：

```shell
npx husky install
```

## 特性

- 使用 TypeScript 开发，提供类型定义文件
- 完整的目录结构，项目代码组织更规范
- 多运行环境配置，预置 `dev` `test` `prod` 环境
- 配备 `mock` 和 `proxy` ，使前后端分离的开发和联调更有效率
- 支持 `*.less` `*.module.less`
- 支持页面切换动画

## 本地测试

> [Custom Templates](https://create-react-app.dev/docs/custom-templates/)
>
> ⚠️ 如遇到提示 `You are running 'create-react-app' 4.0.3, which is behind the latest release (5.0.1).`
>
> 请尝试运行 `npx clear-npx-cache`

```bash
npx create-react-app my-app --template file:../path/to/your/template/cra-template-[template-name]
```

## License

MIT License

[npm]: https://img.shields.io/npm/v/cra-template-doly.svg
[npm-url]: https://npmjs.com/package/cra-template-doly

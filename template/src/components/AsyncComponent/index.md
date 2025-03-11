# AsyncComponent - 异步组件

使用 react 的 `Suspense` `lazy` 处理异步组件加载，设置页面标题。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 同步/异步组件 | `(() => Promise<{ default: Component<any> }>) \| ReactElement` | - |
| title | 页面标题 | `string` | - |

# Router - 路由

路由在 `src/routes.ts` 中配置。

**特性**

- 页面切换动画，需使用 [`PageContainer`](/docs/component-page) 包裹页面
- 支持集成 `keep-alive` ，包含页面激活和未激活钩子方法，[参考 keep-alive 示例](/docs/example-keep-alive)
- 方便以后升级 `react-router-dom@6` `history@5`

## API

```typescript
type RouteItem = {
  path: string;
  name?: string;
  component?: ReturnType<typeof asyncComponent> | React.ComponentType<RouteChildrenProps<any>>;
  routes?: RouteItem[];
  animated?: boolean;
};
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| routes | 路由配置 | `RouteItem[]` | - |
| animated | 是否开启页面切换动画<br/>关闭切换动画后将不使用定位布局 | `boolean` | `true` |
| noMatchPath | 没有匹配到路由时重定向到该页面，一般指向 404 页 | `string` | - |
| onRouteChange | 路由初始化、路由变化时触发 | `(route?:RouteItem)=>void` | - |

### 非组件模块中使用 history

直接使用 `src/utils/history.ts`：

```typescript
import routerHistory from '@/utils/history';

// util function
function xxx() {
  routerHistory.push('/');
}
```

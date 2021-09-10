## Routes

### 方案

- 切换动画
- 支持集成 keep-alive，包含页面激活和未激活钩子方法（结合第三方keep-alive方案）
- 开发上便于升级 react-router-dom@6、history@5


## API

### Routes

```typescript
export type RouteItem = {
  path: string;
  name?: string;
  component?: ReturnType<typeof asyncComponent> | React.ComponentType<RouteChildrenProps<any>>;
  routes?: RouteItem[];
  animated?: boolean;
}
```

| 参数      | 说明     | 类型        | 默认值 |
| --------- | -------- | ----------- | ------ |
| routes | 路由配置 | `RouteItem[]`   | - |
| animated | 切换动画 | `boolean`   | `true` |
| noMatchPath | 没有匹配到路由时重定向到该页面，一般指向404页 | `string`   | - |
| onRouteChange | 路由初始化、路由变化时触发 | `(route?:RouteItem)=>void`   | - |


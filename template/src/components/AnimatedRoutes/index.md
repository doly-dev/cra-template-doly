# AnimatedRoutes

路由在 `src/router.tsx` 中配置。

## 特性

- 使用 [`react-router-dom@6`](https://reactrouter.com/docs/en/v6/api#api-reference)
- 支持路由切换动画，页面请使用 `PageContainer` 包裹

## API

| 参数   | 说明     | 类型            | 默认值 |
| ------ | -------- | --------------- | ------ |
| routes | 路由配置 | `RouteObject[]` | -      |

### RouteObject

参考：[RouteObject](https://reactrouter.com/api/components/Route)

## 常见问题

### 非组件模块中如何跳转页面？

使用 `src/router.tsx` ：

```typescript
import router from '@/router';

// util function
function xxx() {
  router.navigate('/list');
}
```

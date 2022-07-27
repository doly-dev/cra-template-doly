# AnimatedRoutes

路由在 `src/routes.tsx` 中配置。

**特性**

- 使用 [`react-router-dom@6`](https://reactrouter.com/docs/en/v6/api#api-reference) `history@5` 封装
- 支持路由切换动画，页面请使用 `PageContainer` 包裹

## API

| 参数     | 说明             | 类型            | 默认值 |
| -------- | ---------------- | --------------- | ------ |
| routes   | 路由配置         | `RouteObject[]` | -      |
| animated | 关闭页面切换动画 | `boolean`       | `true` |

### RouteObject

```typescript
// import { RouteObject } from 'react-router-dom';

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
}
```

## 常见问题

### 非组件模块中使用 history

直接使用 `src/utils/history.ts` ：

```typescript
import myHistory from '@/utils/history';

// util function
function xxx() {
  myHistory.push('/');
}
```

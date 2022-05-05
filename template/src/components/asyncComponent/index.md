# asyncComponent - 异步组件加载

使用 react 的 `Suspense` `lazy` 处理异步组件加载。

```typescript
import asyncComponent from '@/components/asyncComponent';

const HomePage = asyncComponent(() => import('./pages/home'));

function App() {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
}
```

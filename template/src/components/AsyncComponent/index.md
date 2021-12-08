# asyncComponent - 异步组件加载

使用 [`@loadable/component`](https://www.npmjs.com/package/@loadable/component) 处理异步组件加载

**特性**

- 组件加载中，显示友好的加载页面
- 组件加载失败 或 报错时，渲染降级后的 UI

## Example

```typescript
import ReactDom from 'react-dom';
import asyncComponent from '@/components/asyncComponent';

const HomePage = asyncComponent(() => import('./pages/home'));

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

ReactDom.render(<App />, document.querySelect('.root'));
```

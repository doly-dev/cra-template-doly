# asyncComponent - 异步组件

使用 [`@loadable/component`](https://www.npmjs.com/package/@loadable/component) 处理异步组件

**特性**

- 组件加载中，显示友好的加载页面，使用 `../PageLoading`
- 组件加载失败 或 报错时，渲染降级后的 UI，使用 `../PageLoading` `error`

## Example

```typescript
import ReactDom from 'react-dom';
import asyncComponent from '@/components/AsyncComponent';

const Compo = asyncComponent(()=>import('./pages/home'));

function App(){
  return (
    <div className='app'>
      <Comp />
    </div>
  )
}

ReactDom.render(<App />, document.querySelect('.root'));
```

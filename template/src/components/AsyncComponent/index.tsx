// ref: https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html

import React from 'react';
import loadable from '@loadable/component';
import type { LoadableComponent } from '@loadable/component';
import { PageLoading, PageLoadError } from '../PageLoader';

type AsyncComponentState = {
  hasError: boolean;
};

export default function asyncComponent<Props = any>(importComponent: () => Promise<any>) {
  class AsyncComponent extends React.Component<Props, AsyncComponentState> {
    component: LoadableComponent<Props>;

    constructor(props: any) {
      super(props);

      this.state = {
        hasError: false
      };

      this.component = loadable(importComponent, {
        fallback: <PageLoading />
      });
    }

    static getDerivedStateFromError(error: any) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }

    render() {
      const { hasError } = this.state;

      if (hasError) {
        return <PageLoadError />;
      }

      const C = this.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

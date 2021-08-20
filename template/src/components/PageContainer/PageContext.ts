import * as React from 'react';

type ContextType = {
  // 页面容器
  container: React.MutableRefObject<HTMLDivElement | null>;
};

export default React.createContext<ContextType>({
  container: {
    current: null
  }
});

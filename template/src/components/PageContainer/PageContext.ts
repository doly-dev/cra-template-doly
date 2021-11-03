import * as React from 'react';

type ContextType = {
  // 页面容器
  container: React.RefObject<HTMLDivElement>;
};

export default React.createContext<ContextType>({
  container: {
    current: null
  }
});

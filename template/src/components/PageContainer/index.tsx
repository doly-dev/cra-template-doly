import * as React from 'react';
import classnames from 'classnames';
import PageContext from './PageContext';
import styles from './index.module.less';

export {
  PageContext
}

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  lowerThreshold?: number; // 离底部多少距离触发 onScrollToLower
  onScrollToLower?: (event: MouseEvent | TouchEvent) => void; // 滚动至底部触发
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(({
  children,
  lowerThreshold = 100,
  onScrollToLower,
  onScroll,
  className,
  ...restProps
}, ref) => {
  const innerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = React.useCallback(
    (e) => {
      onScroll?.(e);

      if (typeof onScrollToLower === 'function') {
        const eTarget = e.target;
        const sTop = eTarget.scrollTop;
        const sHeight = eTarget.scrollHeight;
        const cHeight = eTarget.clientHeight;

        const realLowerThreshold = lowerThreshold < 0 ? 0 : lowerThreshold;

        if (sHeight - cHeight - sTop <= realLowerThreshold) {
          onScrollToLower(e);
        }
      }
    },
    [lowerThreshold, onScroll, onScrollToLower],
  );

  // 转换给外部ref
  React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement, [innerRef]);

  return (
    <PageContext.Provider
      value={{
        container: innerRef,
      }}
    >
      <div
        {...restProps}
        className={classnames(styles.page, className)}
        ref={innerRef}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </PageContext.Provider>
  );
})

export default PageContainer;
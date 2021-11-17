import * as React from 'react';
import classnames from 'classnames';
import { getScrollTop, getScrollHeight, getClientHeight } from '@/utils/dom';
import PageContext from './PageContext';
import styles from './index.module.less';

export { PageContext };

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  lowerThreshold?: number; // 离底部多少距离触发 onScrollToLower
  onScrollToLower?: () => void; // 滚动至底部触发
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, lowerThreshold = 100, onScrollToLower, className, ...restProps }, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null);
    const scrollTopLowerRef = React.useRef(onScrollToLower);
    scrollTopLowerRef.current = onScrollToLower;

    React.useEffect(() => {
      const scrollContainer = innerRef.current;

      if (scrollContainer && typeof scrollTopLowerRef.current === 'function') {
        const handleScroll = () => {
          const sTop = getScrollTop(scrollContainer);
          const sHeight = getScrollHeight(scrollContainer);
          const cHeight = getClientHeight(scrollContainer);
          const realLowerThreshold = lowerThreshold < 0 ? 0 : lowerThreshold;

          if (sHeight - cHeight - sTop <= realLowerThreshold) {
            scrollTopLowerRef.current?.();
          }
        };
        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
          scrollContainer?.removeEventListener('scroll', handleScroll);
        };
      }
    }, [lowerThreshold]);

    // 转换给外部ref
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement, [innerRef]);

    return (
      <PageContext.Provider
        value={{
          container: innerRef
        }}
      >
        <div {...restProps} className={classnames(styles.page, className)} ref={innerRef}>
          {children}
        </div>
      </PageContext.Provider>
    );
  }
);

export default PageContainer;

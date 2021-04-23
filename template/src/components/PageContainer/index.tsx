import * as React from 'react';
import styles from './index.module.less';

const PageContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
  const { children, ...restProps } = props;
  return (
    <div className={styles.page} ref={ref} {...restProps}>{children}</div>
  );
})

export default PageContainer;
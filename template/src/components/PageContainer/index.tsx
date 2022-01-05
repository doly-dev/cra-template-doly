import * as React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

const PageContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <div {...restProps} className={classnames(styles.page, className)} ref={ref}>
        {children}
      </div>
    );
  }
);

export default PageContainer;

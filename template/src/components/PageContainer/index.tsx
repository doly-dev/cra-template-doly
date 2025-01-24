import * as React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

const PageContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...restProps
}) => {
  return <div className={classnames(styles.page, className)} {...restProps} />;
};

export default PageContainer;

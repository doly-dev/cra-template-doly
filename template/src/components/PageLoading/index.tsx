// ref: https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html

import * as React from 'react';
import styles from './index.module.less';

type PageLoadingProps = {
  loading?: boolean;
  error?: boolean;
};

const PageLoading: React.FC<PageLoadingProps> = ({ loading = true, error = false }) => {
  // Handle the error state
  if (error) {
    return (
      <div className={styles.pageLoading}>
        <a
          onClick={() => {
            window.location.reload();
          }}
        >
          页面加载失败，点击刷新
        </a>
      </div>
    );
  }
  // Handle the loading state
  else if (loading) {
    return <div className={styles.pageLoading}>页面加载中...</div>;
  } else {
    return null;
  }
};

export default PageLoading;

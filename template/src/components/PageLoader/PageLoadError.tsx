import { useCallback } from 'react';
import styles from './index.module.less';

const LoadError = () => {
  const reload = useCallback(() => {
    window?.location?.reload?.();
  }, []);

  return (
    <div className={styles.pageLoader}>
      <div className={styles.loadErrorText}>
        <a onClick={reload}>加载失败，点击刷新页面</a>
      </div>
    </div>
  );
};

export default LoadError;

import BeatLoader from './BeatLoader';
import styles from './index.module.less';

const PageLoading = () => {
  return (
    <div className={styles.pageLoader}>
      <BeatLoader />
      <div className={styles.loadingText}>加载中</div>
    </div>
  );
};

export default PageLoading;

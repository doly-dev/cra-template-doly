import { useAsync } from 'rc-hooks';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { getReposList } from '@/services/repos';

const ListPage = () => {
  // 如果是分页加载，可以参考：https://doly-dev.github.io/rc-hooks/latest/index.html#/async/use-load-more
  const { data, loading } = useAsync(getReposList, {
    // 下面两个配置表示数据请求后进行缓存，有缓存时不再进行请求，默认缓存5分钟，可通过 cacheTime 设置缓存时间。
    persisted: true,
    cacheKey: 'repos_list'
  });

  return (
    <PageContainer title='列表页'>
      <div style={{ padding: 15 }}>
        {loading && (
          <div style={{ padding: 50, display: 'flex', justifyContent: 'center', color: 'gray' }}>
            列表页数据请求中...
          </div>
        )}
        {data && !loading && data.length > 0 && (
          data.map(({ name, description }) => (
            <div key={name}>
              <h2><Link to={`/repos/detail/${name}`}>{name}</Link></h2>
              <p>{description}</p>
            </div>
          ))
        )}
      </div>
    </PageContainer>
  );
};

export default ListPage;

import { Card, ActivityIndicator } from 'antd-mobile';
import { useAsync } from 'rc-hooks';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { getReposByName } from '@/services/repos';

const DetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data, loading, error } = useAsync(() => getReposByName(name));

  return (
    <PageContainer>
      {loading && (
        <div style={{ padding: 50, display: 'flex', justifyContent: 'center' }}>
          <ActivityIndicator size="large" text="详情页数据请求中..." />
        </div>
      )}
      {!error && !loading && (
        <Card full>
          <Card.Header title={data?.full_name} />
          <Card.Body>
            <div>{data?.description}</div>
          </Card.Body>
          <Card.Footer content={<a href={data?.html_url}>{data?.html_url}</a>} />
        </Card>
      )}
    </PageContainer>
  );
};

export default DetailPage;

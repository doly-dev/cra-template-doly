import * as React from 'react';
import { Card, Icon, WhiteSpace } from 'antd-mobile';
import { useAsync } from 'rc-hooks';
import { useParams } from 'react-router-dom';
import { getReposByName } from '@/services/repos';

const DetailPage: React.FC = () => {
  const { name }: { name: string } = useParams();
  const { data, run, loading, error } = useAsync(() => getReposByName(name));

  if (error) {
    return <button onClick={run}>加载失败，点击重新加载</button>
  }

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 15 }}><Icon type="loading" style={{ marginRight: 5 }} />加载中</div>
  }

  return (
    <>
      <WhiteSpace />
      <Card full>
        <Card.Header
          title={data?.full_name}
        />
        <Card.Body>
          <div>{data?.description}</div>
        </Card.Body>
        <Card.Footer content={<a href={data?.html_url}>{data?.html_url}</a>} />
      </Card>
    </>
  );
};

export default DetailPage;

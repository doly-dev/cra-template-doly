import * as React from 'react';
import { List, Icon } from 'antd-mobile';
import { useAsync } from 'rc-hooks';
import { useHistory } from 'react-router-dom';
import { getReposList } from '@/services/repos';

const { Item } = List;
const { Brief } = Item;

const ListPage: React.FC = () => {
  const history = useHistory();
  const { data, run, loading, error } = useAsync(getReposList, {
    persisted: true,
    cacheKey: "repos_list"
  });

  if (error) {
    return <button onClick={run}>加载失败，点击重新加载</button>
  }

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 15 }}><Icon type="loading" style={{ marginRight: 5 }} />加载中</div>
  }

  return (
    <List renderHeader={() => 'doly-dev'}>
      {
        data && data.length > 0 && data.map(({ name, description }: any) => (
          <Item
            key={name}
            arrow="horizontal"
            multipleLine
            onClick={() => {
              history.push(`/repos/detail/${name}`);
            }}
          >
            {name}
            <Brief>{description}</Brief>
          </Item>
        ))
      }
    </List>
  );
};

export default ListPage;

import * as React from 'react';
import { List, ActivityIndicator } from 'antd-mobile';
import { useAsync } from 'rc-hooks';
import { useHistory } from 'react-router-dom';
import PageContainer from '@/components/PageContainer';
import { getReposList } from '@/services/repos';

const { Item } = List;
const { Brief } = Item;

const ListPage: React.FC = () => {
  const history = useHistory();
  const { data, loading } = useAsync(getReposList, {
    persisted: true,
    cacheKey: "repos_list"
  });

  return (
    <PageContainer>
      {
        loading && <div style={{ padding: 50, display: 'flex', justifyContent: 'center' }}><ActivityIndicator size="large" text="列表页数据请求中..." /></div>
      }
      {
        data && !loading ? (
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
        ) : null
      }
    </PageContainer>
  );
};

export default ListPage;

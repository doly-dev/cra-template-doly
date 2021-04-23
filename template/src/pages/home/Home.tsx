import * as React from 'react';
import { Button, List, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { useAsync } from 'rc-hooks';
import { login } from '@/services/login';
import { getToken, setToken, removeToken } from '@/utils/storage';
import styles from './Home.module.less';

const { Item } = List;

const Home: React.FC = () => {
  const history = useHistory();
  const { data, loading, run, mutate } = useAsync(login, {
    initialData: getToken(),
    formatResult: res => res.data,
    autoRun: false,
    onSuccess: (res) => {
      setToken(res.token);
      Toast.info('登录成功', 1.5);
    }
  });

  const toggleLogin = () => {
    if (data) {
      removeToken();
      mutate(null);
      Toast.info('已退出登录', 1.5);
      return;
    }
    run();
  }

  return (
    <>
      <div className={styles.title}>cra-template-doly</div>
      <List renderHeader={() => '示例页面'}>
        <Item
          arrow="horizontal"
          onClick={() => {
            history.push('/repos/list');
          }}
        >
          列表页
        </Item>
        <Item
          arrow="horizontal"
          onClick={() => {
            history.push('/abc');
          }}
        >
          不存在的页面
        </Item>
      </List>
      <WhiteSpace size="lg" />
      <WingBlank>
        <Button type="primary" loading={loading} onClick={toggleLogin}>
          {
            data ? '退出登录' : '登录'
          }
        </Button>
      </WingBlank>
    </>
  );
};

export default Home;

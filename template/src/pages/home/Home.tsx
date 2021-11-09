import { useState } from 'react';
import { Button, List, WhiteSpace, Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { useAsync } from 'rc-hooks';
import PageContainer from '@/components/PageContainer';
import { login } from '@/services/login';
import { getToken, setToken, removeToken } from '@/utils/tokenStorage';
import styles from './Home.module.less';

const { Item } = List;

const pages = [
  {
    name: '列表页',
    link: '/repos/list'
  },
  {
    name: '不存在的页面',
    link: '/abc'
  }
];

const toast = (text: string) => {
  Toast.info(text, 1.5, () => { }, false);
};

const Home = () => {
  const history = useHistory();
  const [logined, setLogined] = useState(() => !!getToken());
  const { loading, run } = useAsync(login, {
    autoRun: false,
    onSuccess: (res) => {
      setToken(res.data.token);
      setLogined(true);
      toast('登录成功');
    }
  });

  const toggleLogin = () => {
    if (logined) {
      removeToken();
      setLogined(false);
      toast('已退出登录');
    } else {
      run();
    }
  };

  return (
    <PageContainer>
      <div className={styles.title}>cra-template-doly</div>
      <List renderHeader={() => '示例页面'}>
        {pages.map((item) => (
          <Item
            key={item.name}
            arrow="horizontal"
            onClick={() => {
              history.push(item.link);
            }}
          >
            {item.name}
          </Item>
        ))}
      </List>
      <WhiteSpace size="lg" />
      <Button type={logined ? undefined : 'primary'} loading={loading} onClick={toggleLogin}>
        {logined ? '退出登录' : loading ? '登录中' : '点击登录'}
      </Button>
    </PageContainer>
  );
};

export default Home;

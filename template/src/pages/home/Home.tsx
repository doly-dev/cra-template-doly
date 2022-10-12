import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from 'rc-hooks';
import PageContainer from '@/components/PageContainer';
import { login } from '@/services/login';
import { getLoginInfo, setLoginInfo, removeLoginInfo } from '@/utils/storage';
import ExampleImage from '@/assets/images/example@192x192.png';
import styles from './Home.module.less';

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

const Home = () => {
  const [logined, setLogined] = useState(() => !!getLoginInfo()?.token);
  const { loading, run } = useAsync(() => login({ username: 'test', password: '12345' }).then(res => res.data), {
    autoRun: false,
    onSuccess: (res) => {
      setLoginInfo(res);
      setLogined(true);
    }
  });

  const toggleLogin = () => {
    if (logined) {
      removeLoginInfo();
      setLogined(false);
    } else {
      run();
    }
  };

  return (
    <PageContainer>
      <div className={styles.wrapper}>
        <h1>cra-template-doly</h1>
        <p>欢迎使用！</p>
        <mark>
          注意：请根据业务修改 <strong>public</strong> 目录下的文件和内容。
        </mark>
        <h3>示例页面</h3>
        <p>路由在 src/routes.ts 中配置</p>
        <ul>
          {pages.map((item) => (
            <li key={item.name}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <h3>mock 示例</h3>
        <p>点击按钮调用 /api/login 接口</p>
        <button disabled={loading} onClick={toggleLogin}>
          {logined ? '已登录，点击退出登录' : loading ? '登录中' : '点击登录'}
        </button>
        <h3>图片资源</h3>
        <p>
          引入 public 目录文件，该目录用于存放第三方库、字体、图片等不需要构建的资源。如 logo ：
        </p>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
        <p>引入项目中 src/assets 目录文件。如 示例图片：</p>
        <img src={ExampleImage} alt="example img" />
        <hr />
        <p>
          了解更多信息，
          <a
            href="https://doly-dev.github.io/cra-template-doly-site/latest/index.html"
            target="_blank"
            rel="noreferrer"
          >
            请点击查阅文档
          </a>
          。
        </p>
      </div>
    </PageContainer>
  );
};

export default Home;

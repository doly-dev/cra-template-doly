import { Link } from 'react-router-dom';
import Exception from '@/components/Exception';
import PageContainer from '@/components/PageContainer';
import history from '@/utils/history';

const NotFoundPage = () => {
  return (
    <PageContainer>
      <Exception
        title="404"
        desc="抱歉，你访问的页面不存在"
        actions={[
          <a onClick={history.goBack}>返回上一页</a>,
          <Link to='/'>返回首页</Link>
        ]}
      />
    </PageContainer>
  );
};

export default NotFoundPage;

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Exception from '@/components/Exception';
import PageContainer from '@/components/PageContainer';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Exception
        title="404"
        desc="抱歉，你访问的页面不存在"
        actions={[<a onClick={() => navigate(-1)}>返回上一页</a>, <Link to="/">返回首页</Link>]}
      />
    </PageContainer>
  );
};

export default NotFoundPage;

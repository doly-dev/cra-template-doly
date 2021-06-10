import * as React from 'react';
import { Result, Icon } from 'antd-mobile';
import PageContainer from '@/components/PageContainer';

const NoFoundPage: React.FC = () => {
  return (
    <PageContainer>
      <Result
        img={<Icon type="cross-circle-o" style={{ fill: '#F13642', width: 60, height: 60 }} />}
        title="404"
        message="抱歉，你访问的页面不存在"
      />
    </PageContainer>
  );
};

export default NoFoundPage;

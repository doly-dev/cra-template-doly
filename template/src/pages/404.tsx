import * as React from 'react';
import { Result, Icon } from 'antd-mobile';

const NoFoundPage: React.FC = () => {
  return (
    <Result
      img={<Icon type="cross-circle-o" style={{ fill: '#F13642', width: 60, height: 60 }} />}
      title="404"
      message="抱歉，你访问的页面不存在"
    />
  );
};

export default NoFoundPage;

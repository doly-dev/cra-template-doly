import React from 'react';
import { useLocation, useNavigationType, Routes, RoutesProps } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import CSSTransition from './CSSTransition';
import './index.less';

const prefixClass = 'route-group';

// ref: https://github.com/remix-run/react-router/issues/8470#issuecomment-1086901183
const TransitionRoutes: React.FC<RoutesProps> = (props) => {
  const location = useLocation();
  const action = useNavigationType();

  return (
    <TransitionGroup
      className={`${prefixClass} ${prefixClass}-${action === 'POP' ? 'backward' : 'forward'}`}
    >
      <CSSTransition
        key={location.pathname}
        divProps={{
          className: `${prefixClass}-item`
        }}
        classNames={`${prefixClass}-item`}
      >
        <Routes location={location} {...props} />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionRoutes;

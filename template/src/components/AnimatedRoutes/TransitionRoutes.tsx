import React from 'react';
// ref: https://github.com/remix-run/react-router/issues/8470#issuecomment-1086901183
import {
  useLocation,
  useNavigationType,
  Routes,
  RoutesProps,
  UNSAFE_LocationContext as LocationContext
} from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import CSSTransition from './CSSTransition';
import './index.less';

const prefixClass = 'route-group';

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
        <LocationContext.Provider value={{ location, navigationType: action }}>
          <Routes {...props} />
        </LocationContext.Provider>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionRoutes;

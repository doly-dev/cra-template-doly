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

const TransitionRoutes: React.FC<RoutesProps> = (props) => {
  const location = useLocation();
  const action = useNavigationType();

  const classNames = action === 'POP' ? 'route-backward' : 'route-forward';

  return (
    <TransitionGroup
      component={null}
      childFactory={(child) =>
        React.cloneElement(child, {
          classNames
        })
      }
    >
      <CSSTransition key={location.pathname}>
        <div className="route-animated">
          <LocationContext.Provider value={{ location, navigationType: action }}>
            <Routes {...props} />
          </LocationContext.Provider>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionRoutes;

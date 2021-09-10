import * as React from 'react';
import { Router, Route, Redirect, useLocation, matchPath } from 'react-router-dom';
import type { RouteChildrenProps } from 'react-router-dom';
import { createHashHistory } from 'history';
import type asyncComponent from '@/components/AsyncComponent';
import CSSTransition from './CSSTransition';
import { joinPaths } from './utils';
import './index.less';

export const routerHistory = createHashHistory();

export type RouteItem = {
  path: string;
  name?: string;
  component?: ReturnType<typeof asyncComponent> | React.ComponentType<RouteChildrenProps<any>>;
  routes?: RouteItem[];
  animated?: boolean;
}

function formatRoutes(routes?: RouteItem[], parentPath: string = '') {
  const ret: RouteItem[] = [];

  if (Array.isArray(routes) && routes.length > 0) {
    routes.forEach((route) => {
      const { routes, path, component, ...rest } = route;
      const resolvePath = joinPaths([parentPath, path]);

      if (routes && routes.length > 0) {
        ret.push(...formatRoutes(routes, resolvePath));
      } else if (component) {
        ret.push({ ...rest, path: resolvePath, component });
      }
    });
  }

  return ret;
}

export const AnimatedRoute: React.FC<Omit<RouteItem, 'routes'>> = ({ path, component: C, animated = true }) => {
  if (!C) {
    return null;
  }

  return (
    <Route path={path} exact>
      {
        (routeProps) => {
          const { match, history } = routeProps;

          const routeView = (
            <div className="router">
              <C {...routeProps} />
            </div>
          )

          if (animated) {
            return (
              <CSSTransition
                in={match !== null}
                classNames={history.action === 'POP' ? 'router-slideOut' : 'router-slideIn'}
                timeout={300}
                unmountOnExit
              >
                {routeView}
              </CSSTransition>
            )
          }

          if (match) {
            return routeView;
          }

          return null;
        }
      }
    </Route>
  )
}

export interface RoutesProps {
  routes: RouteItem[];
  animated?: boolean;
  noMatchPath?: RouteItem['path'];
  onRouteChange?: (route?: RouteItem) => void;
}

const WrapperNoMatch: React.FC<RoutesProps> = ({ routes, noMatchPath }) => {
  const location = useLocation();
  const hasMatch = React.useMemo(() => routes.some(routeItem => matchPath(location.pathname, {
    path: routeItem.path,
    exact: true
  })), [location.pathname, routes]);

  if (!noMatchPath || hasMatch) {
    return null;
  }
  return <Redirect from='*' to={noMatchPath} />
}

const WrapperRouter: React.FC<RoutesProps> = ({
  routes,
  animated = true,
  noMatchPath,
  onRouteChange
}) => {
  const formattedRoutes = React.useMemo(() => formatRoutes(routes), [routes]);

  React.useEffect(() => {
    if (onRouteChange) {
      const unlisten = routerHistory.listen((location) => {
        const match = formattedRoutes.find(routeItem => matchPath(location.pathname, {
          path: routeItem.path,
          exact: true
        }));
        onRouteChange?.(match);
      });
      return () => {
        unlisten();
      }
    }
  }, [formattedRoutes, onRouteChange]);

  return (
    <Router history={routerHistory}>
      <div className='router-wrapper'>
        {formattedRoutes.map(route => (
          <AnimatedRoute animated={animated} {...route} key={route.path} />
        ))}
        <WrapperNoMatch routes={formattedRoutes} noMatchPath={noMatchPath} />
      </div>
    </Router >
  );
}

export default WrapperRouter;
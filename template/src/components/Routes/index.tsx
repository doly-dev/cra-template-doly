import * as React from 'react';
import { Route, useLocation, matchPath } from 'react-router-dom';
import type { RouteChildrenProps } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type asyncComponent from '@/components/AsyncComponent';
import CSSTransition from './CSSTransition';
import { joinPaths } from './utils';
import './index.less';

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

export const AnimatedRoute: React.FC<Omit<RouteItem, 'routes'>> = ({ path, name, component: C, animated = true }) => {
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
              <Helmet>
                <title>{name || ''}</title>
              </Helmet>
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

          return routeView;
        }
      }
    </Route>
  )
}

export interface RoutesProps {
  routes: RouteItem[];
  animated?: boolean;
  noMatch?: RouteItem['component'];
}

const WrapperNoMatch: React.FC<RoutesProps> = ({ routes, noMatch: NoMatchComponent }) => {
  const location = useLocation();
  const hasMatch = React.useMemo(() => routes.some(routeItem => matchPath(location.pathname, {
    path: routeItem.path,
    exact: true,
    strict: true
  })), [location.pathname, routes]);

  if (!NoMatchComponent || hasMatch) {
    return null;
  }

  return <AnimatedRoute path='*' name='404' component={NoMatchComponent} animated={false} />;
}

const Routes: React.FC<RoutesProps> = (props) => {
  const { routes, animated = true, noMatch } = props;
  const formattedRoutes = formatRoutes(routes);

  return (
    <div className='router-wrapper'>
      {formattedRoutes.map(route => (
        <AnimatedRoute animated={animated} {...route} key={route.path} />
      ))}
      <WrapperNoMatch routes={formattedRoutes} noMatch={noMatch} />
    </div>
  );
}

export default Routes;
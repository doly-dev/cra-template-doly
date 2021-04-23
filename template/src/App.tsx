import React from 'react';
import '@/App.less';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import asyncComponent from '@/components/AsyncComponent';
import PageContainer from '@/components/PageContainer';
import { joinPaths } from '@/utils/utils';

type RouteConfigType = {
  name: string;
  path: string;
  exact?: boolean;
  component?: ReturnType<typeof asyncComponent>;
  routes?: RouteConfigType[];
}

const routes: RouteConfigType[] = [
  {
    path: '/',
    name: '首页',
    exact: true,
    component: asyncComponent(() => import('@/pages/home'))
  },
  {
    path: 'repos',
    name: '仓库',
    routes: [
      {
        path: 'list',
        name: '仓库列表',
        component: asyncComponent(() => import('@/pages/repos/List'))
      },
      {
        path: 'detail/:name',
        name: '仓库详情',
        component: asyncComponent(() => import('@/pages/repos/Detail'))
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: asyncComponent(() => import('@/pages/404'))
  },
];

function getRoutes(routeConfig?: typeof routes, parentPath: string = '') {
  const ret: (React.ReactElement | null)[] = [];

  if (Array.isArray(routeConfig) && routeConfig.length > 0) {
    routeConfig.forEach((route) => {
      const { routes, path, component: C, ...rest } = route;
      const resolvePath = joinPaths([parentPath, path]);

      if (C) {
        ret.push(<Route path={resolvePath} key={resolvePath} exact render={(routerProps) => {
          return <PageContainer><C {...routerProps} /></PageContainer>
        }} {...rest} />)
      }

      if (routes) {
        ret.push(...getRoutes(route.routes, resolvePath));
      }
    });
  }

  return ret;
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          {
            getRoutes(routes)
          }
          <Redirect to="/404" />
        </AnimatedSwitch>
      </div>
    </HashRouter>
  )
}

export default App;

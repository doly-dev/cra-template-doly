import { RouteObject } from 'react-router-dom';
import AsyncComponent from './components/AsyncComponent';

const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <AsyncComponent component={() => import('./pages/home')} title='首页' />
      },
      {
        path: 'repos',
        children: [
          {
            path: 'list',
            element: <AsyncComponent component={() => import('./pages/repos/List')} title='列表页' />
          },
          {
            path: 'detail/:name',
            element: <AsyncComponent component={() => import('./pages/repos/Detail')} title='详情页' />
          }
        ]
      },
      {
        path: '*',
        element: <AsyncComponent component={() => import('./pages/404')} title='404' />
      }
    ]
  }
];

export default routes;

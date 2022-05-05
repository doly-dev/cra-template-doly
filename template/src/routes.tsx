import { RouteObject } from 'react-router-dom';
import asyncComponent from './components/asyncComponent';

const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: asyncComponent(() => import('./pages/home'))
      },
      {
        path: 'repos',
        children: [
          {
            path: 'list',
            element: asyncComponent(() => import('./pages/repos/List'))
          },
          {
            path: 'detail/:name',
            element: asyncComponent(() => import('./pages/repos/Detail'))
          }
        ]
      },
      {
        path: '*',
        element: asyncComponent(() => import('./pages/404'))
      }
    ]
  }
];

export default routes;

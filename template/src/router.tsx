import { Route, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import AnimatedRoutes, { AnimatedRouteObject } from './components/AnimatedRoutes';

const routes: AnimatedRouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: () => import('./pages/home'),
        title: '首页'
      },
      {
        path: 'repos',
        children: [
          {
            path: 'list',
            element: () => import('./pages/repos/List'),
            title: '列表页'
          },
          {
            path: 'detail/:name',
            element: () => import('./pages/repos/Detail'),
            title: '详情页'
          }
        ]
      },
      {
        path: '*',
        element: () => import('./pages/404'),
        title: '404'
      }
    ]
  }
];

/**
 * 页面跳转可以使用该模块
 *
 * @example
 * import router from '@/router'
 *
 * router.navigate('/page')
 */
const router = createHashRouter(
  createRoutesFromElements(<Route path="*" element={<AnimatedRoutes routes={routes} />} />)
);

export default router;

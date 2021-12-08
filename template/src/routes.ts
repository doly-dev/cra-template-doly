import asyncComponent from '@/components/asyncComponent';

const routes = [
  {
    path: '/',
    name: '首页',
    component: asyncComponent(() => import('./pages/home'))
  },
  {
    path: 'repos',
    name: '仓库',
    routes: [
      {
        path: 'list',
        name: '仓库列表',
        component: asyncComponent(() => import('./pages/repos/List'))
      },
      {
        path: 'detail/:name',
        name: '仓库详情',
        component: asyncComponent(() => import('./pages/repos/Detail'))
      }
    ]
  },
  {
    path: '404',
    name: '页面不存在',
    component: asyncComponent(() => import('./pages/404'))
  }
];

export default routes;

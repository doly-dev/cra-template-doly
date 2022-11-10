import { createHashRouter, createRoutesFromElements, IndexRouteObject, NonIndexRouteObject, Route, RouteObject } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';
import AsyncComponent, { AsyncComponentProps } from './components/AsyncComponent';

type CustomRouteExtend = {
  element?: AsyncComponentProps['component'];
  title?: AsyncComponentProps['title'];
  children?: CustomRouteObject[];
};
type CustomIndexRouteObject = Omit<IndexRouteObject, 'element'> & Omit<CustomRouteExtend, 'children'>;
type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'element' | 'children'> & CustomRouteExtend;
type CustomRouteObject = CustomIndexRouteObject | CustomNonIndexRouteObject;

const routes: CustomRouteObject[] = [
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

function transformCustomRoutes(routesConfig: CustomRouteObject[]): RouteObject[] {
  return routesConfig.map(({ title, element, children, index, ...rest }) => {
    const newElement = element ? <AsyncComponent component={element} title={title} /> : element;
    if (index) {
      return {
        index,
        element: newElement,
        ...rest
      };
    }
    return {
      element: newElement,
      children: Array.isArray(children) ? transformCustomRoutes(children) : children,
      ...rest
    }
  });
}

const router = createHashRouter(createRoutesFromElements(<Route path='*' element={<AnimatedRoutes routes={transformCustomRoutes(routes)} />} />));

export default router;

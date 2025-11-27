import { isValidElement, lazy } from 'react';
import { isArray } from 'ut2';
import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';
import AsyncComponent, { AsyncComponentProps } from '@/components/AsyncComponent';

type AsyncComp = Parameters<typeof lazy>[0];

type TCustomRoute = {
  element?: React.ReactElement | AsyncComp;
  title?: AsyncComponentProps['title'];
  children?: TCustomRouteObject[];
};
type TCustomIndexRouteObject = Omit<IndexRouteObject, 'element'> & Omit<TCustomRoute, 'children'>;
type TCustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'element' | 'children'> & TCustomRoute;
type TCustomRouteObject = TCustomIndexRouteObject | TCustomNonIndexRouteObject;

function defineRoutes(routes: TCustomRouteObject[]): RouteObject[] {
  return routes.map(({ title, element, children, ...rest }) => {
    const newRoute: RouteObject = {
      ...rest
    };
    if (element) {
      newRoute.element = (
        <AsyncComponent
          component={isValidElement(element) ? element : lazy(element as AsyncComp)}
          title={title}
        />
      );
    }

    if (isArray(children)) {
      newRoute.children = defineRoutes(children);
    }

    return newRoute;
  });
}

export default defineRoutes;

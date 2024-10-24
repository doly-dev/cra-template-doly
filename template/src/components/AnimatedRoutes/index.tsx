import { isArray } from 'ut2';
import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';
import AnimatedRoutes, { AnimatedRoutesProps } from './AnimatedRoutes';
import AsyncComponent, { AsyncComponentProps } from '../AsyncComponent';

type CustomRouteExtend = {
  element?: AsyncComponentProps['component'];
  title?: AsyncComponentProps['title'];
  children?: AnimatedRouteObject[];
};
type CustomIndexRouteObject = Omit<IndexRouteObject, 'element'> &
  Omit<CustomRouteExtend, 'children'>;
type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'element' | 'children'> &
  CustomRouteExtend;

export type AnimatedRouteObject = CustomIndexRouteObject | CustomNonIndexRouteObject;

function transformCustomRoutes(routesConfig: AnimatedRouteObject[]): RouteObject[] {
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
      children: isArray(children) ? transformCustomRoutes(children) : children,
      ...rest
    };
  });
}

const WrapperAnimatedRoutes: React.FC<
  Omit<AnimatedRoutesProps, 'routes'> & { routes: AnimatedRouteObject[] }
> = ({ routes, ...restProps }) => {
  return <AnimatedRoutes routes={transformCustomRoutes(routes)} {...restProps} />;
};

export default WrapperAnimatedRoutes;

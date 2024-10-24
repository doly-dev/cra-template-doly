import { Route, RouteObject } from 'react-router-dom';
import { isArray } from 'ut2';

function createRoutes(routes: (RouteObject & { lazy?: any })[]) {
  return routes.map((route, i) => {
    const { children, index, ...rest } = route || {};
    const internalKey = `${index ? 'index' : rest?.path || ''}-${i}`;

    // IndexRouteObject 或 NonIndexRouteObject且没有children
    if (index || !isArray(children) || children.length <= 0) {
      return <Route index={index} key={internalKey} {...rest} />;
    }

    return (
      <Route index={index} key={internalKey} {...rest}>
        {createRoutes(children)}
      </Route>
    );
  });
}

export default createRoutes;

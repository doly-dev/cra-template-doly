import { Route, RouteObject } from 'react-router-dom';

function createRoutes(routes: RouteObject[]) {
  return routes.map((route, i) => {
    const { children, index, ...rest } = route || {};
    const internalKey = `${index ? 'index' : (rest?.path || '')}-${i}`;

    // IndexRouteObject 或 NonIndexRouteObject且没有children
    if (index || !Array.isArray(children) || children.length <= 0) {
      return <Route index={index} key={internalKey} {...rest} />
    }

    return (
      <Route index={index} key={internalKey} {...rest}>
        {createRoutes(children)}
      </Route>
    )
  });
}

export default createRoutes;

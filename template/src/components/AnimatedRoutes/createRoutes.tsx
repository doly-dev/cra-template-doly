import { Route, RouteObject } from 'react-router-dom';

function createRoutes(routes: RouteObject[]) {
  return routes.map(({ children, ...rest }, index) => (
    <Route {...rest} key={index}>
      {
        Array.isArray(children) && children.length > 0 && createRoutes(children)
      }
    </Route>
  ));
}

export default createRoutes;

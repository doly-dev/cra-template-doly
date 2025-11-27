import React from 'react';
import { RoutesProps, RouteObject } from 'react-router-dom';
import TransitionRoutes from './TransitionRoutes';
import createRoutes from './createRoutes';

export interface AnimatedRoutesProps extends Omit<RoutesProps, 'location'> {
  routes: RouteObject[];
}

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ routes, ...restProps }) => {
  const elements = createRoutes(routes);

  return <TransitionRoutes {...restProps}>{elements}</TransitionRoutes>;
};

export default AnimatedRoutes;

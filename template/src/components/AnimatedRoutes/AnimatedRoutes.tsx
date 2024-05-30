import React from 'react';
import { RoutesProps, RouteObject, Routes } from 'react-router-dom';
import TransitionRoutes from './TransitionRoutes';
import createRoutes from './createRoutes';

export interface AnimatedRoutesProps extends RoutesProps {
  routes: RouteObject[];
  animated?: boolean;
}

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({
  routes,
  animated = true,
  ...restProps
}) => {
  const elements = createRoutes(routes);
  const RoutesComp = animated ? TransitionRoutes : Routes;

  return <RoutesComp {...restProps}>{elements}</RoutesComp>;
};

export default AnimatedRoutes;

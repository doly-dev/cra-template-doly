import React from 'react';
import { RoutesProps, RouteObject } from 'react-router-dom';
import TransitionRoutes from './TransitionRoutes';
import createRoutes from './createRoutes';

interface AnimatedRoutesProps extends RoutesProps {
  routes: RouteObject[];
}

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ routes, ...restProps }) => {
  return (
    <TransitionRoutes {...restProps}>
      {createRoutes(routes)}
    </TransitionRoutes>
  );
}

export default AnimatedRoutes;
import React, { HTMLAttributes, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type TransitionProps<RefElement extends undefined | HTMLElement = HTMLElement> = Partial<
  CSSTransitionProps<RefElement>
> & {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  divProps?: HTMLAttributes<HTMLDivElement>;
};

const Transition: React.FC<TransitionProps> = ({
  timeout = 300,
  children,
  divProps,
  ...restProps
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition timeout={timeout} nodeRef={nodeRef} {...restProps}>
      <div {...divProps} ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Transition;

import React, { cloneElement, forwardRef, useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type TransitionProps<RefElement extends undefined | HTMLElement = HTMLElement> = Partial<
  CSSTransitionProps<RefElement>
> & {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const Transition: React.FC<TransitionProps> = forwardRef(
  ({ timeout = 300, children, ...restProps }, ref) => {
    const nodeRef = useRef<HTMLElement | null>(null);
    const handleRef = useCallback(
      (refValue: HTMLElement | null) => {
        nodeRef.current = refValue;
        const childRef = children.props.ref || ref;

        if (childRef !== null) {
          if (typeof childRef === 'function') {
            childRef(refValue);
          } else {
            childRef.current = refValue;
          }
        }
      },
      [children.props.ref, ref]
    );

    return (
      <CSSTransition timeout={timeout} nodeRef={nodeRef} {...restProps}>
        {cloneElement(children, {
          ref: handleRef
        })}
      </CSSTransition>
    );
  }
);

export default Transition;

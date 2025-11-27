import React, { Suspense, isValidElement, lazy, useEffect } from 'react';
import { PageLoading } from '../PageLoader';

type LazyComp = ReturnType<typeof lazy>;

export interface AsyncComponentProps {
  component: LazyComp | React.ReactElement;
  title?: string;
}

const AsyncComponent: React.FC<AsyncComponentProps> = ({ component, title = '' }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  if (isValidElement(component)) {
    return component;
  }

  const Comp = component as LazyComp;

  return (
    <Suspense fallback={<PageLoading />}>
      <Comp />
    </Suspense>
  );
};

export default AsyncComponent;

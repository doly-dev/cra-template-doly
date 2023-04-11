import React, { Suspense, lazy, useEffect } from 'react';
import { PageLoading } from '../PageLoader';

type AsyncComp = Parameters<typeof lazy>[0];

export interface AsyncComponentProps {
  component: AsyncComp | React.ReactElement;
  title?: string;
}

const AsyncComponent: React.FC<AsyncComponentProps> = ({ component, title = '' }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  if (React.isValidElement(component)) {
    return component;
  }

  const Comp = lazy(component as AsyncComp);

  return (
    <Suspense fallback={<PageLoading />}>
      <Comp />
    </Suspense>
  );
};

export default AsyncComponent;

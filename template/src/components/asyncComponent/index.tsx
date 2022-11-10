import React, { Suspense, lazy, useEffect } from 'react';
import { PageLoading } from '../PageLoader';

export interface AsyncComponentProps {
  component: Parameters<typeof lazy>[0] | React.ReactElement;
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

  const Comp = lazy(component);

  return (
    <Suspense fallback={<PageLoading />}>
      <Comp />
    </Suspense>
  );
};

export default AsyncComponent;

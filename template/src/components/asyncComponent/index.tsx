import { Suspense, lazy, useEffect } from 'react';
import { PageLoading } from '../PageLoader';

const AsyncComponent: React.FC<{ component: Parameters<typeof lazy>[0], title?: string; }> = ({ component, title = '' }) => {
  const Comp = lazy(component);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <Suspense fallback={<PageLoading />}>
      <Comp />
    </Suspense>
  );
};

export default AsyncComponent;

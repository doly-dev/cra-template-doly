import { Suspense, lazy } from 'react';
import { PageLoading } from '../PageLoader';

const asyncComponent = (...args: Parameters<typeof lazy>) => {
  const Comp = lazy(...args);
  return (
    <Suspense fallback={<PageLoading />}>
      <Comp />
    </Suspense>
  )
}

export default asyncComponent;
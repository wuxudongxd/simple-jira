import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import React from 'react';
import { ErrorBoundary } from '~/components/common/error-boundary';
import { useAuth } from '~/hooks/http/useAuth';

const AuthenticatedApp = React.lazy(() => import("./views/project"));
const UnauthenticatedApp = React.lazy(
  () => import("./views/unAuth")
);

function App() {
  const result = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {!result.isFetching && !result.data && <UnauthenticatedApp />}
          {result.isSuccess && result.data && <AuthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

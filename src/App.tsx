import React from "react";
import { ErrorBoundary } from "src/components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useAuth } from "hooks/useAuth";

const AuthenticatedApp = React.lazy(
  () => import("./screens/authenticated-app")
);
const UnauthenticatedApp = React.lazy(
  () => import("./screens/unauthenticated-app")
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

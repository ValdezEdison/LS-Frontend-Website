import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { Suspense } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary"; // Import as named import

function App() {
  return (
    <ErrorBoundary> {/* Wrap ErrorBoundary around everything */}
      <Suspense fallback={<div></div>}>
        <BrowserRouter>
          {/* Ensure that Router and PageNotFound are wrapped within Suspense */}
          <Router />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

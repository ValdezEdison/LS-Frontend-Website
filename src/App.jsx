import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { Suspense } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary"; // Import as named import
import store from './store';
import { Provider } from 'react-redux';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <LocationProvider>
          <Suspense fallback={<div></div>}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </Suspense>
        </LocationProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;

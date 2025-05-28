import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { Suspense } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary"; // Import as named import
import { store } from "./app/store";
import { Provider } from 'react-redux';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div></div>}>
      <ErrorBoundary>
        <LocationProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
        </LocationProvider>
      </ErrorBoundary>
      </Suspense>
    </Provider>
  );
}

export default App;

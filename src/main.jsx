import React from "react";
// import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom/client'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./global.css";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import i18n from "./i18n";
import { LanguageProvider } from "./context/LanguageContext";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <LanguageProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </Provider>
    </LanguageProvider>
//  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

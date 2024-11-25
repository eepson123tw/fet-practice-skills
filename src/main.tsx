import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Layout from "./layout.tsx";


import { AppProvider } from './store/AppContext.tsx';

// Update the render section
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <Layout>
        <App />
      </Layout>
    </AppProvider>
  </React.StrictMode>
);

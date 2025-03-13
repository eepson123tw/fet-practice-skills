import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Layout from "./layout.tsx";
import { scan } from "react-scan";

import { AppProvider } from "./store/AppContext.tsx";
import { ThemeProvider } from "./store/ThemeContext.tsx";
import { SidebarProvider } from "@components/ui/sidebar";

scan({
  enabled: false,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProvider>
        <SidebarProvider>
          <Layout>
            <App />
          </Layout>
        </SidebarProvider>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

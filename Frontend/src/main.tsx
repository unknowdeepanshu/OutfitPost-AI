import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/Darkmode/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.ts";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Conversion from "@/components/Conversion/conversion.tsx";
import Dashboard from "@/pages/Dashboard/Dashboard.tsx";
import App from "@/pages/Landing/App.tsx";
const Route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [{ path: "project/:threadId", element: <Conversion /> }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={Route} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);

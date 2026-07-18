import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/Darkmode/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.ts";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Conversion from "./components/Conversion/conversion.tsx";
const Route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/:threadId", element: <Conversion /> }],
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

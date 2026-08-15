import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/Darkmode/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.ts";
import { ClerkProvider } from "@clerk/react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Conversion from "@/components/Conversion/conversion.tsx";
import Dashboard from "@/pages/Dashboard/DashboardSkeleton.tsx";
import App from "@/pages/Landing/App.tsx";
import ProtectRoutes from "@/components/ProtecteRoutes/ProtecteRoutes.tsx";
import Setting from "@/pages/setting/setting.tsx";
import Anylatic from "@/components/Anylatic/Anylatic.tsx";
import Page404 from "@/pages/NoFound/Notfound.tsx";
import { AxiosInterceptor } from "./services/axios.ts";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <ProtectRoutes Children={<Dashboard />} />,
    children: [
      { path: "", element: <Anylatic /> },
      { path: "project/:threadId", element: <Conversion /> },
      { path: "Account", element: <Setting /> },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <ThemeProvider>
        <AxiosInterceptor />
        <RouterProvider router={Route} />
      </ThemeProvider>
    </Provider>
  </ClerkProvider>,
);

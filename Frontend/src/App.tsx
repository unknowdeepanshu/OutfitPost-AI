import Page from "./components/Sidebar/Sidebar";
import { useTheme } from "./components/Darkmode/theme-provider";

import { Toaster } from "sonner";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <Page />

      <Toaster theme={theme} />
    </>
  );
}

export default App;

import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Page404 from "../NoFound/Notfound";
import type { RootState } from "@/Store/store";
import Sidebars from "@/components/Sidebar/Sidebar";

import { useTheme } from "@/components/Darkmode/theme-provider";
import { Toaster } from "sonner";
function Dashboard() {
  const { theme } = useTheme();
  const project = useSelector((state: RootState) => state.project);
  console.log(project);
  const { threadId } = useParams();
  const array = project.filter((e) => e.ProjectId === threadId);
  const present = threadId === undefined || array.length > 0;
  console.log("this is thread id", threadId);
  return (
    <>
      {present ? <Sidebars /> : <Page404 />}
      <Toaster theme={theme} />
    </>
  );
}

export default Dashboard;

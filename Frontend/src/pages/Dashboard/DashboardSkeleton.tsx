import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Page404 from "../NoFound/Notfound";
import type { RootState, AppDispatch } from "@/Store/store";
import Sidebars from "@/components/Sidebar/Sidebar";
import * as React from "react";
import { useTheme } from "@/components/Darkmode/theme-provider";
import { Toaster } from "sonner";
import { GetProjects } from "@/Store/projectCreate/projectThunk";

function Dashboard() {
  const { theme } = useTheme();
  const { threadId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const project = useSelector((state: RootState) => state.project);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        await dispatch(GetProjects()).unwrap();
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const projectExists =
    threadId === undefined ||
    project.some((item) => item.ProjectId === threadId);

  return (
    <>
      {projectExists ? <Sidebars /> : <Page404 />}
      <Toaster theme={theme} />
    </>
  );
}

export default Dashboard;

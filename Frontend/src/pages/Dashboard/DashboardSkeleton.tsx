import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Page404 from "../NoFound/Notfound";
import type { RootState } from "@/Store/store";
import Sidebars from "@/components/Sidebar/Sidebar";

import { useTheme } from "@/components/Darkmode/theme-provider";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { getToken } from "@clerk/react";

function Dashboard() {
  const { theme } = useTheme();
  const project = useSelector((state: RootState) => state.project);
  console.log(project);
  const { threadId } = useParams();
  const array = project.filter((e) => e.ProjectId === threadId);
  const present = threadId === undefined || array.length > 0;
  console.log("this is thread id", threadId);
  // this is for Authorization

  const send = async () => {
    const userToken = await getToken();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_GATEWAY_API}/api/v1/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("this is error", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await send();
      console.log("this is auth", data);
    };

    getData();
  }, []);
  return (
    <>
      {present ? <Sidebars /> : <Page404 />}
      <Toaster theme={theme} />
    </>
  );
}

export default Dashboard;

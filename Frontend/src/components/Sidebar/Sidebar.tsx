import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../Darkmode/Toggle";
import { Outlet } from "react-router";

import { useParams } from "react-router";
import { useSelector } from "react-redux";

import type { RootState } from "@/Store/store";
import Page404 from "../404/404page";
export default function Page() {
  const project = useSelector((state: RootState) => state.project);
  console.log(project);
  const { threadId } = useParams();

  const array = project.filter((e) => e.ProjectId === threadId);
  const present = threadId === undefined || array.length > 0;
  console.log("this is thread id", threadId);
  return (
    <>
      {present ? (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center justify-between gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
              </div>

              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        <ModeToggle />
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-10 p-4 pt-0">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      ) : (
        <Page404 />
      )}
    </>
  );
}

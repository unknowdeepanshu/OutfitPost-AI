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
import Conversion from "../Conversion/conversion";

export default function Page() {
  return (
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
          {/* <div className="grid flex-1 grid-cols-3 gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video h-full w-[stretch] rounded-xl" />
            <div className="bg-muted/50 col-span-2 aspect-video h-full w-[stretch] rounded-xl" />
          </div> */}
          <Conversion />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  TerminalIcon,
} from "lucide-react";
import { CreateProject } from "./ProjectDioalog/CreateProject";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/store";
import { Link } from "react-router";
import { useUser } from "@clerk/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const data = {
    user: {
      name: `${user?.fullName}`,
      email: `${user?.emailAddresses}`,
      avatar: `${user?.imageUrl}`,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: <TerminalSquareIcon />,
        isActive: true,
      },

      {
        title: "Settings",
        url: "#",
        icon: <Settings2Icon />,
      },
    ],
  };

  const project = useSelector((state: RootState) => state.project);
  console.log(project);
  console.log("this is user data:-", user);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <TerminalIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">OutfitPost AI</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CreateProject />
        <NavMain items={data.navMain} />
        <NavProjects projects={project} />
        {/* <ScrollAreaDemo /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

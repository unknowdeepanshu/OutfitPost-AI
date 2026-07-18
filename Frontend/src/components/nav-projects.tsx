import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DeleteProject } from "@/Store/projectCreate/projectSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

interface NavProjects {
  projects: {
    ProjectName: string;
    ProjectId: string;
  }[];
}
export function NavProjects({ projects }: NavProjects) {
  const dispatch = useDispatch();
  const { isMobile } = useSidebar();
  function handleDeleted(id: string) {
    dispatch(DeleteProject(id));
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <ScrollArea className="h-121">
          {projects.map((item) => (
            <SidebarMenuItem key={item.ProjectName}>
              <SidebarMenuButton
                render={<Link to={`project/${item.ProjectId}`} />}
              >
                <span>{item.ProjectName}</span>
              </SidebarMenuButton>
              <Separator className="my-0" />
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuAction
                      showOnHover
                      className="aria-expanded:bg-muted"
                    />
                  }
                >
                  <MoreHorizontalIcon />
                  <span className="sr-only">More</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      handleDeleted(item.ProjectId);
                    }}
                  >
                    <Trash2Icon className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </ScrollArea>
      </SidebarMenu>
    </SidebarGroup>
  );
}

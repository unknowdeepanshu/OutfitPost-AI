import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Button } from "./ui/button";
import { api } from "@/services/axios";

type projectStructure = {
  ProjectName: string;
  ProjectId: string;
};
interface NavProjects {
  projects: projectStructure[];
}
export function NavProjects({ projects }: NavProjects) {
  const dispatch = useDispatch();
  const { isMobile } = useSidebar();
  const deleteConverstion = async (id: string) => {
    const response = await api.post("/conversations/delete", { ProjectId: id });
    console.log(await response.data);
  };
  const CalledConvertion = async (id: string) => {
    const response = await deleteConverstion(id);
    console.log("this convertion", response);
  };
  function handleDeleted(id: string) {
    CalledConvertion(id);
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
                  <DropdownMenuItem>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleDeleted(item.ProjectId);
                      }}
                    >
                      <Trash2Icon className="text-muted-foreground" />
                      <span>Delete Project</span>
                    </Button>
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

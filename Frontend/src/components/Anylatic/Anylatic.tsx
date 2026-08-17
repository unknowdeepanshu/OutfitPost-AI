import { SidebarInset } from "@/components/ui/sidebar";
import { SectionCards } from "./chats&cards/AnalyticsCards";
import { Profile } from "./chats&cards/profile/Profile";

export default function Anylatic() {
  return (
    <>
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}

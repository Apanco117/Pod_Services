import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import TeamSwitcher from "./team-switcher"
import NavMain from "./nav-main"
import NavUser from "./nav-user"
import type { User } from "@/types"
import { getNavData } from "@/config/sidebardata"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User; 
}

export default function AppSidebar( { user, ...props }: AppSidebarProps ) {
    const navmain = getNavData(user.role);
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navmain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
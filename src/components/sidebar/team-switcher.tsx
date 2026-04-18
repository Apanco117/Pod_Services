import { TerminalSquare } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

export default function TeamSwitcher() {

    const naviaget = useNavigate();

    return (
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    onClick={() => naviaget("/")}
                >
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <TerminalSquare size={18} strokeWidth={2.5} />
                    </div>
                    <div className="grid flex-1 text-left text-xs leading-tight">
                        <span className="truncate font-medium"> POD Terminal </span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
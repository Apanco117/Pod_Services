import {
    IconCreditCard,
    IconDotsVertical,
    IconNotification,
    IconUserCircle,
} from "@tabler/icons-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { User } from "@/types"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


type NavUSerType = {
    user : User
}

export default function NavUser({ user }: NavUSerType) {
    const initial = user.nombre.charAt(0).toUpperCase() + user.nombre.charAt(1).toUpperCase();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { setOpenMobile, isMobile } = useSidebar();

    const handleLogout = async () => {
        if (isMobile) {
            setOpenMobile(false);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        localStorage.removeItem('AUTH_TOKEN');
        queryClient.clear();
        toast.success('Sesión cerrada correctamente');
        navigate('/auth/login');
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg grayscale">
                                <AvatarImage src={""} alt={user.nombre} />
                                <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.nombre}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                {user.email}
                                </span>
                            </div>
                            <IconDotsVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={""} alt={user.nombre} />
                                    <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.nombre}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {user.email}
                                </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <IconUserCircle />
                                Cuenta
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconCreditCard />
                                Portafolio
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconNotification />
                                Notificaciones
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            onClick={handleLogout}
                            className="group flex items-center gap-2 focus:bg-red-800 cursor-pointer transition-colors"
                        >
                            <LogOut className="size-4 text-red-700 group-focus:text-white" />
                            <span className="font-medium text-red-700 group-focus:text-white">
                                Cerrar sesión
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

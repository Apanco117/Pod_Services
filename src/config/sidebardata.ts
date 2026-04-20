import { Banknote, ChartBar, Cuboid, FolderDot, LayoutDashboard, Settings2, User } from "lucide-react";

export const getNavData = (userRole: string) => {
    console.log("User Role:", userRole);
    const navMain = [
        {
            title: "Main",
            url: "/",
            icon: LayoutDashboard,
            isActive: true,
            
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                }
            ],
        },
        {
            title: "Monitor",
            url: "/monitor",
            icon: ChartBar,
            isActive: true,
            items: [
                {
                    title: "Eventos de conexion",
                    url: "/monitor/events",
                },
                {
                    title: "Conexiones activas",
                    url: "/monitor/live",
                }
            ],
        },
        {
            title: "Administrar",
            url: "/admin",
            icon: FolderDot,
            isActive: true,
            items: [
                {
                    title: "Equipos registrados",
                    url: "/admin/equipos",
                }
            ],
        },
        {
            title: "SIT",
            url: "/sit",
            icon: Banknote,
            isActive: true,
            items: [
                {
                    title: "Nodos SIT",
                    url: "/sit/nodos",
                }
            ],
        },
        {
            title: "Configuración",
            url: "/usuarios",
            icon: Settings2,
            roles: ['ADMIN'],
            items: [
                {
                    title: "Usuarios y Accesos",
                    url: "/admin/users",        
                    icon: User,
                },
                {
                    title: "Stocks",
                    url: "/admin/stocks",        
                    icon: Cuboid,
                },
            ],
        },
    ];

    return navMain.filter(item => {
        if (!item.roles) return true;
        return item.roles.includes(userRole);
    });
}